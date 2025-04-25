import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';

const FormModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState  ({ name: '', email: '', age: '' });
    const [submittedData, setSubmittedData] = useState ([]);
    const [editIndex, setEditIndex] = useState (null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'age' ? Number(value) : value,
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            const updated = [...submittedData];
            updated[editIndex] = formData;
            setSubmittedData(updated);
            setEditIndex(null);
        } else {
            setSubmittedData(prev => [...prev, formData]);
        }
        setFormData({ name: '', email: '', age: 0 });
        setShowModal(false);
    };

    const handleEdit = (index) => {
        if (typeof index !== 'number') return;
        setFormData(submittedData[index]);
        setEditIndex(index);
        setShowModal(true);
    };

    const handleDelete = (index) => {
        if (typeof index !== 'number') return;
        const updated = submittedData.filter((_, i) => i !== index);
        setSubmittedData(updated);
    };

    return (
        <div className='p-4'>
            <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
                Open Form
            </button>

            {showModal && (
                <div className='fixed inset-0 flex items-center  justify-center bg- black bg-opacity-50'>
                    <div className=' bg-white p-6 rounded-lg shadow-lg w-80'>
                        <h2 className='text-lg font-semibold mb-4'>
                            Employee Information
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name='name'
                                placeholder='Enter Name'
                                value={formData.name}
                                onChange={handleChange}
                                className='border px-3 py-1 w-full mb-3'
                                required
                            />
                            <input
                                type="email"
                                name='email'
                                placeholder='Enter Email'
                                value={formData.email}
                                onChange={handleChange}
                                className='border px-3 py-1 w-full mb-3'
                                required
                            />
                            <input
                                type="number"
                                name='age'
                                placeholder='Enter Age'
                                value={formData.age}
                                onChange={handleChange}
                                className='border px-3 py-1 w-full mb-3'
                            />

                            <div className='flex justify-end gap-2'>
                                <button
                                    type='button'
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-400 text-white px-3 py-1 rounded"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className='bg-green-500  text-white px-3 py-1 rounded'
                                >
                                    Submit
                                </button>

                            </div>
                        </form>

                    </div>
                </div>
            )}
            {/* tableview */}
            <div className='mt-6'>
                <h3 className='font-semibold text-lg'>  Submitted Data: </h3>
                {submittedData.length === 0 ? (
                    <p className=' text-gray-500'> No data yet</p>    
                ) : (
                    <table className='min-w-full border'>
                        <thead className='bg-gray-100 text-left'>
                            <tr>
                                <th className='py-2 px-4 border'>#</th>
                                <th className='py-2 px-4 border'>Name</th>
                                <th className='py-2 px-4 border'>Email</th>
                                <th className='py-2 px-4 border'>Age</th>
                                <th className='py-2 px-4 border'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submittedData.map((item, index) => (
                                <tr key={index} className='border-t'>
                                    <td className='py-2 px-4 border'>{index + 1}</td>
                                    <td className='py-2 px-4 border'>{item.name}</td>
                                    <td className='py-2 px-4 border'>{item.email}</td>
                                    <td className='py-2 px-4 border'>{item.age}</td>
                                    <td className="py-2 px-4 border space-x-2">
                                        <button onClick={() => handleEdit(index)} className="bg-yellow-400 p-1 rounded text-white">
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(index)} className="bg-red-500 p-1 rounded text-white">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

        </div>
    )
}

export default FormModal;