package com.datn.atino.service.respone;


import java.util.List;

public class PageResponse<T> extends CommonResponse<T> {

    private long dataCount;

    public PageResponse() {}

    public PageResponse(long dataCount) {
        this.dataCount = dataCount;
    }

    public long getDataCount() {
        return dataCount;
    }

    public void setDataCount(long dataCount) {
        this.dataCount = dataCount;
    }

    public PageResponse<T> success() {
        this.result = new Result().errorCode("00").message("Thành công").isOk(true);
        return this;
    }

    public PageResponse<T> columns() {
        return this;
    }

    public PageResponse<T> dataCount(long dataCount) {
        this.dataCount = dataCount;
        return this;
    }

    @Override
    public PageResponse<T> result(String errorCode, String errorMessage, boolean ok) {
        super.result(errorCode, errorMessage, ok);
        return this;
    }

    @Override
    public PageResponse<T> errorCode(String errorCode) {
        super.errorCode(errorCode);
        return this;
    }

    @Override
    public PageResponse<T> message(String message) {
        super.message(message);
        return this;
    }

    @Override
    public PageResponse<T> isOk(boolean ok) {
        super.isOk(ok);
        return this;
    }

    @Override
    public PageResponse<T> data(T data) {
        super.data(data);
        return this;
    }

    @Override
    public String toString() {
        return "PageResponse{" + "dataCount=" + dataCount + '}';
    }
}
