const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
}

const handleDuplicateFieldsDB = err => {
    const value = err.errmsg.match(/"(.*?)"/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400)
}

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
}

const handleJWTError = () =>
    new AppError('Invalid token.  Please log in again.', 401);

const handleJWTExpiredError = () =>
    new AppError('Expired token.  Please log in again.', 401);

const sendErrorDev = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        // API
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    } else {
        // RENDERED WEBSITE
        console.error('ERROR', err);
        res.status(err.statusCode).render('error', {
            title: 'Something went wrong!',
            msg: err.message
        });
    }
}

const sendErrorProd = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        // API
        if (err.isOperational) {
            // Operational, trusted error: send message to client
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        } else {
            // Programming or other unkown error: don't leak error details

            // Log error
            console.error('ERROR', err);

            // Send generic message
            return res.status(500).json({
                status: 'error',
                message: 'Something went very wrong!'
            });
        }
    } else {
        // RENDERED WEBSITE
        if (err.isOperational) {
            // Operational, trusted error: send message to client            
            return res.status(err.statusCode).render('error', {
                title: 'Something went wrong!',
                msg: err.message
            });
        } else {
            // Programming or other unkown error: don't leak error details

            // Log error
            console.error('ERROR', err);

            // Send generic message
            return res.status(err.statusCode).render('error', {
                title: 'Something went wrong!',
                msg: 'Please try again later'
            });
        }
    }
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === 'production') {
        let errCopy = { ...err };
        errCopy.message = err.message;

        if (errCopy.name === 'CastError') errCopy = handleCastErrorDB(errCopy);
        if (errCopy.code === 11000) errCopy = handleDuplicateFieldsDB(errCopy);
        if (errCopy.name === 'ValidationError') errCopy = handleValidationErrorDB(errCopy);
        if (errCopy.name === 'JsonWebTokenError') errCopy = handleJWTError();
        if (errCopy.name === 'TokenExpiredError') errCopy = handleJWTExpiredError();

        sendErrorProd(errCopy, req, res);
    }
};