import { useState } from 'react';

export const useModal = () => {
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleClickOpenCreateModal = () => {
        setOpenCreateModal(true);
    };

    const handleClickCloseCreateModal = () => {
        setOpenCreateModal(false);
    };

    const handleClickOpenEditModal = () => {
        setOpenEditModal(true);
    };

    const handleClickCloseEditModal = () => {
        setOpenEditModal(false);
    };
    const handleClickOpenDeleteModal = () => {
        setOpenDeleteModal(true);
    };

    const handleClickCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };

    return {
        openCreateModal,
        openEditModal,
        openDeleteModal,
        handleClickOpenCreateModal,
        handleClickCloseCreateModal,
        handleClickOpenEditModal,
        handleClickCloseEditModal,
        handleClickOpenDeleteModal,
        handleClickCloseDeleteModal,
    };
};