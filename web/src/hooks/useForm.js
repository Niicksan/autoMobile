import { useState } from 'react';

export const useForm = (initialValues, onSubmitHandler, vehicleId, serviceId) => {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const changeHandlerImageFile = (e) => {
        const file = e.target.files[0];

        setValues(state => ({ ...state, 'imageFile': file }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onSubmitHandler(values, vehicleId, serviceId);
    };

    return {
        values,
        setValues,
        changeHandler,
        changeHandlerImageFile,
        onSubmit
    };
};
