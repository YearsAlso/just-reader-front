class PageDto {
    [x: string]: number;

    constructor() {
        this.page = 1;
        this.pageSize = 10;
    }

    page: number;
    pageSize: number;

    get offset(): number {
        return (this.page - 1) * this.pageSize;
    }

    get limit(): number {
        return this.pageSize;
    }

    get pageStart(): number {
        return this.offset;
    }

    get pageEnd(): number {
        return this.offset + this.pageSize;
    }
 
}

export default PageDto;
