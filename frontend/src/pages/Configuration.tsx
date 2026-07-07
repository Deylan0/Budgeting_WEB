import { useState } from 'react';
import styles from '/src/configuration.module.css'


interface Category {
    id: number;
    name: string;
    monthly: number;
    goal?: number;
}

interface CategoryTableProps {
    categories: Category[];
    onUpdate: (id: number, field: keyof Category, value: string | number) => void;
    onDelete: (id: number) => void;
}

function CategoryTable({ categories, onDelete, onUpdate }: CategoryTableProps  ){ 
        return(
        <table className={styles.categoriesTable}>
            <thead>
                <tr>
                    <th colSpan={4}>Categories</th>
                </tr>
                <tr>
                    <th>Category Name</th>
                    <th>Monthly amount</th>
                    <th>Goal amounts</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td>
                        <input
                        className={ styles.input}
                            type='text'
                            value={category.name}
                            onChange={(e) => onUpdate(category.id, 'name', e.target.value)}
                         />
                         </td>
                        <td>
                            <input
                                type="number"
                                value={category.monthly}
                                onChange={(e) => onUpdate(category.id, 'monthly', Number(e.target.value))}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={category.goal}
                                onChange={(e) => onUpdate(category.id, 'goal', Number(e.target.value))}
                            />
                        </td>
                        <td>
                            <button onClick={() => onDelete(category.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        );
    }

function Configuration(){

    const [categories, setCategories] = useState<Category[]>([]);


    function addCategory() {
        const newCategory: Category = {
            id: Date.now(),
            name: '',
            monthly: 0,
            goal: 0,
        };
        setCategories((prev) => [...prev, newCategory]);
    }

    function updateCategory(id: number, field: keyof Category, value: string | number) {
        setCategories((prev) =>
            prev.map((category) =>
                category.id === id ? { ...category, [field]: value } : category
            )
        );
    }

    function deleteCategory(id: number) {
        if(confirm("do tou want to delete this category?")){
            setCategories((prev) => prev.filter((category) => category.id !== id));
        } else {

        }

    }

    return(
        <div>
         <CategoryTable
                categories={categories}
                onUpdate={updateCategory}
                onDelete={deleteCategory}
            />
            <button className={ styles.addButton } onClick={addCategory}>Add Category</button>
        </div>
    )
}

export default Configuration;