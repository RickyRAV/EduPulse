export interface ApiResponse {
    data:       DataItem[];
    pagination: Pagination;
}

export interface DataItem {
    id:   string;
    name: string;
}

export interface Pagination {
    total_records: number;
}

export interface SpecializationsResponse {
    data: SpecializationEntry[];
}

export interface SpecializationEntry {
    specializationsId: string;
    teachersId:        string;
    createdAt:         string;
}

export interface SpecializationRequestBody {
    teacher:         string;
    specializations: string[];
}
