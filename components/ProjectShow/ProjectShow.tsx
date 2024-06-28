// eslint-disable-next-line no-unused-vars
import React from 'react'
import { 
    Show, 
    SimpleShowLayout, 
    ImageField, 
    TextField, 
    RichTextField, 
    DeleteButton 
} from 'react-admin';
import './index.css'

export const ProjectShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
                <div className='show-actions'>
                    <DeleteButton />
                </div>
                <ImageField source='images' src='url' title='desc' />
                <TextField source='name' />
                <TextField source="team" />
                <RichTextField source='description' />
            </SimpleShowLayout>
        </Show>
    );
};