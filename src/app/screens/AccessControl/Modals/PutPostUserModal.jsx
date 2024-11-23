/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem } from "@mui/material";
import { usePutUserActions } from '../../../../hooks/user/usePutUserActions'
import { usePostUserActions } from '../../../../hooks/user/usePostUserActions'
import { INTERNAL_ROLES } from "../../../../common/rolesPermissions";

export const PutPostUserModal = ({ open, onClose, onSave, user = {} }) => {

  const isEditMode = Object.keys(user).length > 0;

  const { isLoading, handleCallApi } = isEditMode
    ? usePutUserActions({ userId: user._id })
    : usePostUserActions()

  const [formValues, setFormValues] = useState({
    cuit: user.cuit || '',
    fullName: user.fullName || '',
    birthDate: user.birthDate || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    location: user.location || '',
    position: user.position || '',
    department: user.department || '',
    accessRole: user.accessRole || '',
  }
  );

  const [defaultFormValues, setDefaultFormValues] = useState(formValues)


  const handleSubmit = async () => {

    const hasChanged = JSON.stringify(formValues) !== JSON.stringify(defaultFormValues);

    const response = await handleCallApi(formValues, hasChanged)

    if (!hasChanged) return

    if (response.hasError) return;

    onClose();

    onSave({ _id: response.response, ...formValues })

  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight={'bold'}>{isEditMode ? "Editar Usuario" : "Crear Usuario"}</DialogTitle>
      <DialogContent>

        <TextField
          margin="dense"
          label="CUIT"
          name="cuit"
          value={formValues.cuit}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          margin="dense"
          label="Rol de Acceso"
          name="accessRole"
          value={formValues.accessRole}
          onChange={handleChange}
          select
          fullWidth
          required
        >
          {Object.values(INTERNAL_ROLES).map(role => (
            <MenuItem key={role} value={role}>{role}</MenuItem>
          ))}
        </TextField>

        <TextField
          margin="dense"
          label="Nombre Completo"
          name="fullName"
          value={formValues.fullName}
          onChange={handleChange}
          fullWidth
          required
        />

        <TextField
          margin="dense"
          label="Correo Electrónico"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          margin="dense"
          label="Fecha de Nacimiento"
          name="birthDate"
          type="date"
          value={formValues.birthDate.substring(0, 10)} // Para asegurarse de que el formato sea compatible con <input type="date">
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          label="Teléfono"
          name="phone"
          value={formValues.phone}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Dirección"
          name="address"
          value={formValues.address}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Ubicación"
          name="location"
          value={formValues.location}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Cargo"
          name="position"
          value={formValues.position}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Departamento"
          name="department"
          value={formValues.department}
          onChange={handleChange}
          fullWidth
        />

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose} color="secondary" variant="contained">Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {isEditMode ? "Guardar Cambios" : "Crear Usuario"}
        </Button>

      </DialogActions>

    </Dialog>
  );
};




const validationsBeforeSave = (newRow, showAlert) => {
  const isRowValid = Object.values(newRow).every((value) => value !== '' && value !== null);

  if (!isRowValid) {
    showAlert('Todos los campos son obligatorios', 'warning');
    return;
  }

  // const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newRow.email);
  // const isPhoneValid = /^\d{3}-\d{3}-\d{4}$/.test(newRow.phone);
  // const isBirthDateValid = new Date(newRow.birthDate) < new Date();
  // const isEntryDateValid = new Date(newRow.entryDate) < new Date();

  // switch (false) {
  //     case isEmailValid:
  //         showAlert('El email no es válido', 'warning');
  //         break;
  //     case isPhoneValid:
  //         showAlert('El teléfono no es válido', 'warning');
  //         break;
  //     case isBirthDateValid:
  //         showAlert('La fecha de nacimiento no puede ser futura', 'warning');
  //         break;
  //     case isEntryDateValid:
  //         showAlert('La fecha de ingreso no puede ser futura', 'warning');

  // }

  return true
  // return isEmailValid && isPhoneValid && isBirthDateValid && isEntryDateValid;
};