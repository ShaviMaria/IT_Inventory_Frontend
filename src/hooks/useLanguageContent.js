const useLanguageContent = (lan) => {
    if(lan === 'auto'){
        lan = window.navigator.language.slice(0, 2)
    }
    switch(lan) {
        case 'es':
            return language.spanish
        case 'en':
            return language.english
        default:
            return 'Error'
    }
}

const language = {
    spanish: {
        home: 'Inicio',
        properties: 'Propiedades',
        property: 'Propiedad',
        networks: 'Redes',
        departaments: 'Departamentos',
        users: 'Usuarios',
        trademarks: 'Marcas',
        accounts: 'Cuentas',
        appleid: 'AppleID',
        google: 'Google',
        phone_lines: 'Líneas Telefónicas',
        extensions: 'Extensiones',
        hostnames: 'Hostnames',
        phones: 'Teléfonos',
        mobiles: 'Moviles',
        models: 'Modelos',
        fixed: 'Fijos',
        tablets: 'Tablets',
        computers: 'Computadoras',
        operating_Systems: 'Sistemas Operativos',
        monitors: 'Monitores',
        printers: 'Impresoras',
        switches: 'Switches',
        UPS: 'UPS',
        servers: 'Servidores',
        events: 'Eventos',
        settings: 'Configuración',
        sign_off: 'Salir',
        hello: 'Hola',
        system_user: 'Usuario de sistema',
        name: 'Nombre',
        first_surname: 'Primer apellido',
        second_surname: 'Segundo apellido',
        user: 'Usuario',
        employee_number: 'Número de empleado',
        email: 'Correo',
        job: 'Puesto',
        user_type: 'Tipo de usuario',
        language: 'Idioma',
        modify: 'Modificar',
        english: 'Ingles',
        spanish: 'Español',
        select: 'Seleccionar',
        save: 'Guardar',
        add_user: 'Añadir usuario',
        change_password: 'Cambiar contraseña',
        new_password: 'Nueva contraseña',
        repeat_password: 'Repita contraseña',
        password_dont_match: 'Las contraseña no coincide',
        loading: 'Cargando',
        update_successfully: 'Actualizado correctamente',
        search: 'Buscar',
        new: 'Nuevo',
        code: 'Código',
        details: 'Detalles',
        accept: 'Aceptar',
        new_property: 'Nueva propiedad',
        new_network: 'Nueva red',
        add: 'Añadir',
        cancel: 'Cancelar',
        delete: 'Eliminar',
        input_error: 'Error en el input',
        already_exist: 'ya existente',
        property_added_successfuly: 'Propiedad añadida correctamente',
        network_added_successfuly: 'Red añadida correctamente',
        property_deleted_successfuly: 'Propiedad eliminada correctamente',
        network_deleted_successfuly: 'Red eliminada correctamente',
        property_delete_failed: 'Fallo al eliminar la propiedad',
        network_delete_failed: 'Fallo al eliminar la red',
        delete_property: 'Eliminar propiedad',
        delete_network: 'Eliminar red',
        you_cant_delete_property: 'No puedes eliminar la propiedad',
        you_cant_delete_network: 'No puedes eliminar la red',
        there_are_still_related_elements: 'Aún hay elementos relacionados',
        are_you_sure_you_want_to_delete_property: '¿Estas seguro que deseas eliminar la propiedad',
        are_you_sure_you_want_to_delete_network: '¿Estas seguro que deseas eliminar la red',
        this_action_cannot_be_reversed: 'Esta acción no podrá ser revertida',
        update_property: 'Actualizar propiedad',
        update_network: 'Actualizar red',
        update: 'Actualizar',
        property_code: 'Código de propiedad',
        property_name: 'Nombre de propiedad',
        property_updated_successfuly: 'Propiedad actualizada correctamente',
        property_update_data_duplicated: 'Se ha actualizado la propiedad pero no hubo cambios en los datos',
        property_update_failed: 'Fallo al actualizar la propiedad',
        add_property_failed: 'Fallo en agregar la propiedad',
        add_network_failed: 'Fallo en agregar la red',
        network_address: 'Dirección de red',
        network_name: 'Nombre de red',
        field_required: 'Este campo es obligatorio',
        only_numbers: 'Solo se pueden ingresar números',
        network_name: 'Nombre de red',
        host_amount: 'Número de hosts',
        length: 'Longitud',
        gateway: 'Puerta de enlace',
        dhcp_server: 'Servidor DHCP',
        subnet_mask: 'Mascara de Subred',
        only_private_ip: 'Sólo se admiten direcciones privadas',
        invalid_ip_format: 'Formato de IP invalido',
        not_valid: 'no valido',
    }, 
    english: {
        home: 'Home',
        properties: 'Properties',
        property: 'Property',
        networks: 'Networks',
        departaments: 'Departaments',
        users: 'Users',
        trademarks: 'TradeMarks',
        accounts: 'Accounts',
        appleid: 'AppleID',
        google: 'Google',
        phone_lines: 'Phone Lines',
        extensions: 'Extensions',
        hostnames: 'Hostnames',
        phones: 'Phones',
        mobiles: 'Mobiles',
        models: 'Models',
        fixed: 'Fixed',
        tablets: 'Tablets',
        computers: 'Computers',
        operating_Systems: 'Operating Systems',
        monitors: 'Monitors',
        printers: 'Printers',
        switches: 'Switches',
        UPS: 'UPS',
        servers: 'Servers',
        events: 'Events',
        settings: 'Settings',
        sign_off: 'Sign Off',
        hello: 'Hello',
        system_user: 'System user',
        name: 'Name',
        first_surname: 'First surname',
        second_surname: 'Second surname',
        user: 'User',
        employee_number: 'Employee number',
        email: 'Email',
        job: 'Job',
        user_type: 'User type',
        language: 'Language',
        modify: 'Modify',
        english: 'English',
        spanish: 'Spanish',
        select: 'Select',
        save: 'Save',
        add_user: 'Add user',
        change_password: 'Change password',
        new_password: 'New password',
        repeat_password: 'Repeat password',
        password_dont_match: "Password don't match",
        loading: 'Loading',
        update_successfully: 'Updated successfully',
        search: 'Search',
        new: 'New',
        code: 'Code',
        details: 'Details',
        accept: 'Accept',
        new_property: 'New property',
        new_network: 'New network',
        add: 'Add',
        cancel: 'Cancel',
        delete: 'Delete',
        input_error: 'Input error',
        already_exist: 'already exist',
        property_added_successfuly: 'Property added successfuly',
        network_added_successfuly: 'Network added successfuly',
        network_deleted_successfuly: 'Network deleted successfuly',
        property_deleted_successfuly: 'Property deleted successfuly',
        property_delete_failed: 'Property delete failed',
        network_delete_failed: 'Network delete failed',
        delete_property: 'Delete property',
        delete_network: 'Delete network',
        you_cant_delete_property: 'You cannot delete property',
        you_cant_delete_network: 'You cannot delete network',
        there_are_still_related_elements: 'There are still related items',
        are_you_sure_you_want_to_delete_property: 'Are you sure you want to delete property',
        are_you_sure_you_want_to_delete_network: 'Are you sure you want to delete network',
        this_action_cannot_be_reversed: 'This action cannot be reversed',
        update_property: 'Update property',
        update_network: 'Update network',
        update: 'Update',
        property_code: 'Property code',
        property_name: 'Property name',
        property_updated_successfuly: 'Property updated successfully',
        property_update_data_duplicated: 'The property has been updated but there was no change in the data',
        property_update_failed: 'Property update failed',
        add_property_failed: 'Failed to add property',
        add_network_failed: 'Failed to add network',
        network_address: 'Network address',
        network_name: 'Network name',
        host_amount: 'Host amount',
        length: 'Length',
        gateway: 'Gateway',
        dhcp_server: 'DHCP Server',
        field_required: 'This field is required',
        only_numbers: 'Only numbers can be entered',
        network_name: 'Network name',
        subnet_mask: 'Subnet Mask',
        only_private_ip: 'Only private addresses are allowed',
        invalid_ip_format: 'Invalid IP format',
        not_valid: 'not valid',
    }
}

export default useLanguageContent;