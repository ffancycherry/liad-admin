// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Datagrid, Identifier, List, RaRecord, TextField } from 'react-admin';

export const DevteamList = () => {
    const handleRowClick = (
        id: Identifier,
        resource: string,
        record: RaRecord
    ) => {
        localStorage.setItem('show', JSON.stringify(record.id))

        return 'show'
    }
    return (
        <List>
            <Datagrid rowClick={handleRowClick}>
                <TextField source='id' />
                <TextField source='name' />
                <TextField source='position' />
                <TextField source='contacts' />
                <TextField source='img' />
            </Datagrid>
        </List>
    )
 };