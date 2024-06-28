// eslint-disable-next-line no-unused-vars
import React from 'react'
import { 
    Show, 
    SimpleShowLayout, 
    ImageField, 
    TextField, 
    DeleteButton 
} from 'react-admin';
import './index.css'

export const DevteamShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
                <div className='show-actions'>
                    <DeleteButton />
                </div>
                <ImageField source='img' src='url' title='desc' />
                <TextField source='name' />
                <TextField source='position' />
                <TextField source='contacts' />
            </SimpleShowLayout>
        </Show>
    );
};