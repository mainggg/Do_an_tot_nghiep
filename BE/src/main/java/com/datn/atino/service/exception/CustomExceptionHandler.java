package com.datn.atino.service.exception;

import com.datn.atino.service.respone.CommonResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.web.csrf.CsrfException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class CustomExceptionHandler {
    @Autowired
    MessageSource messageSource;

    private Logger logger = LogManager.getLogger(CustomExceptionHandler.class);
    @ExceptionHandler(value = { CustomException.class })
    protected ResponseEntity<Object> handleCustomException(CustomException ex, WebRequest request) {
        String errorMsg = messageSource.getMessage(ex.getErrorCode(), ex.getArgs(), ex.getErrorCode(), request.getLocale());
        return ResponseEntity
            .status(ex.getHttpStatus())
            .body(new CommonResponse<>().errorCode(ex.getErrorCode()).message(errorMsg).isOk(false));
    }

    @ExceptionHandler(value = { RuntimeException.class, Exception.class })
    protected ResponseEntity<Object> handleInternalException(Exception ex, WebRequest request) {
        logger.error("err", ex);
        if (ex instanceof CsrfException) {
            logger.error("invalid token or token is empty");
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new CommonResponse<>().errorCode("unauthorized").message("invalid token or token is empty"));
        } else if (ex instanceof AccessDeniedException || ex instanceof InsufficientAuthenticationException) {
            logger.error("access denied");
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(
                    new CommonResponse<>()
                        .errorCode("access.denied")
                        .message(messageSource.getMessage("access.denied", null, request.getLocale()))
                );
        }
        String errorMsg = messageSource.getMessage("internal.error", null, request.getLocale());
        return ResponseEntity.internalServerError().body(new CommonResponse<>().errorCode("internal.error").message(errorMsg).isOk(false));
    }
}
