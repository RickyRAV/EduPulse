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

export interface CoursesResponse {
    data:       Class[];
    pagination: Pagination;
}

export interface Class {
    name:           string;
    year:           string;
    course_details: CourseDetail[];
}

export interface CourseDetail {
    name: string;
    id:   string;
}

export interface AssignmentsResponse {
    data:       Assignment[];
    pagination: Pagination;
}

export interface Assignment {
    id:          string;
    title:       string;
    description: string;
    difficulty:  number;
    max_hours:   number;
    course:      Course;
}

export interface Course {
    id:       string;
    name:     string;
    class_id: string;
}
