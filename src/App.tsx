import React, { useState } from "react";
import DataList from "./components/DataList";
import "./index.css";

// Определение интерфейсов для студентов, предметов и оценок
export type Student = {
    id: number;
    name: string;
    class: string;
}

export type Subject = {
    id: number;
    title: string;
}

export type Grade = {
    id: number;
    studentId: number;
    subjectId: number;
    date: string;
    grade: string;
}

const App: React.FC = () => {
    const [students, setStudents] = useState<Student[]>([
        { id: 1, name: "Alice", class: "4-A" },
        { id: 2, name: "Bob", class: "6-A" },
        { id: 3, name: "", class: "" },
    ]);

    const [subjects, setSubjects] = useState<Subject[]>([
        { id: 1, title: "Math" },
        { id: 2, title: "English" },
        { id: 3, title: "" },
    ]);

    const [grades, setGrades] = useState<Grade[]>([
        { id: 1, studentId: 1, subjectId: 1, date: "2024-05-01", grade: "A" },
        { id: 2, studentId: 2, subjectId: 2, date: "2024-05-02", grade: "B" },
        { id: 3, studentId: 3, subjectId: 3, date: "", grade: "" },
    ]);

    return (
        <div className="container">
            <header>
                <h1 className="header-text">Student Management System</h1>
            </header>
            <div className="main-content">
                <section className="students">
                    <DataList type="students" data={students} setData={setStudents} />
                </section>
                <section className="subjects">
                    <DataList type="subjects" data={subjects} setData={setSubjects} />
                </section>
                <section className="grades">
                    <DataList
                        type="grades"
                        data={grades}
                        setData={setGrades}
                        students={students}
                        subjects={subjects}
                    />
                </section>
            </div>
        </div>
    );
};

export default App;
