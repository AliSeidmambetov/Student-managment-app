import React from "react";
import { Student, Subject, Grade } from "../App";

// Пропсы компонента DataList
interface DataListProps<T> {
    type: string;
    data: T[];
    setData: React.Dispatch<React.SetStateAction<T[]>>;
    students?: Student[];
    subjects?: Subject[];
}

const DataList = <T extends { id: number }>({
                                                type,
                                                data,
                                                setData,
                                                students,
                                                subjects,
                                            }: DataListProps<T>) => {
    const addItem = () => {
        let newItem: T | null = null;
        if (type === "students") {
            newItem = {id: Date.now(), name: "", class: ""} as unknown as T;
        } else if (type === "subjects") {
            newItem = {id: Date.now(), title: ""} as unknown as T;
        } else if (type === "grades") {
            newItem = {
                id: Date.now(),
                studentId: students?.[0]?.id || 0,
                subjectId: subjects?.[0]?.id || 0,
                date: "",
                grade: "",
            } as unknown as T;
        }
        if (newItem) {
            setData([...data, newItem]);
        }
    };

    const updateItem = (id: number, key: string, value: string | number) => {
        setData(
            data.map((item) => (item.id === id ? { ...item, [key]: value } : item))
        );
    };

    const deleteItem = (id: number) => {
        setData(data.filter((item) => item.id !== id));
    };

    return (
        <div>
            <h2>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
            <button className="add" onClick={addItem}>
                Add {type.slice(0, -1)}
            </button>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        {type === "students" && (
                            <>
                                <input
                                    type="text"
                                    value={(item as unknown as Student).name}
                                    onChange={(e) =>
                                        updateItem(item.id, "name", e.target.value)
                                    }
                                    placeholder="Name"
                                />
                                <input
                                    type="text"
                                    value={(item as unknown as Student).class}
                                    onChange={(e) =>
                                        updateItem(item.id, "class", e.target.value)
                                    }
                                    placeholder="Class"
                                />
                            </>
                        )}
                        {type === "subjects" && (
                            <input
                                type="text"
                                value={(item as unknown as Subject).title}
                                onChange={(e) =>
                                    updateItem(item.id, "title", e.target.value)
                                }
                                placeholder="Title"
                            />
                        )}
                        {type === "grades" && (
                            <>
                                <select
                                    value={(item as unknown as Grade).studentId}
                                    onChange={(e) =>
                                        updateItem(item.id, "studentId", e.target.value)
                                    }
                                >
                                    {students?.map((student) => (
                                        <option key={student.id} value={student.id}>
                                            {student.name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    value={(item as unknown as Grade).subjectId}
                                    onChange={(e) =>
                                        updateItem(item.id, "subjectId", e.target.value)
                                    }
                                >
                                    {subjects?.map((subject) => (
                                        <option key={subject.id} value={subject.id}>
                                            {subject.title}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="date"
                                    value={(item as unknown as Grade).date}
                                    onChange={(e) => updateItem(item.id, "date", e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={(item as unknown as Grade).grade}
                                    onChange={(e) =>
                                        updateItem(item.id, "grade", e.target.value)
                                    }
                                    placeholder="Grade"
                                />
                            </>
                        )}
                        <button className="delete" onClick={() => deleteItem(item.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DataList;
