class ResultDto {
    public success: boolean;
    public message: string;
    public data: any;

    constructor(success: boolean, message: string, data: any) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static success(data: any, message: string = "Success"): ResultDto {
        return new ResultDto(true, message, data);
    }

    static fail(message: string = "Fail", data: any = null): ResultDto {
        return new ResultDto(false, message, data);
    }

    static successPage(data: any, total: number, page: number, pageSize: number, message: string = "Success"): ResultDto {
        return new ResultDto(true, message, {
            data,
            total,
            page,
            pageSize
        });
    }
}

export default ResultDto;
