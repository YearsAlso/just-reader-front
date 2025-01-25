class SearchDto {

    public sortBy: string = "id";

    public desc: boolean = false;

    public getSortBy(): string {
        return this.sortBy;
    }

    public setSortBy(sortBy: string): void {
        this.sortBy = sortBy;
    }

    public getDesc(): boolean {
        return this.desc;
    }

    public setDesc(desc: boolean): void {
        this.desc = desc;
    }

}

export default SearchDto;
