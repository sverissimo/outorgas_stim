import { useEffect } from 'react';

import TextField from '@material-ui/core/TextField';
import { CustomButton } from './components/CustomButton';
import { loginForm } from './loginForm';
import './userAuth.scss'


interface UserAuthData {
    email: string;
    password: string;
    [key: string]: string;
}

interface UserAuthTemplateProps {
    data: UserAuthData;
    handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const UserAuthTemplate: React.FC<UserAuthTemplateProps> = ({ data, handleInput, handleSubmit }) => {

    useEffect(() => {
        setTimeout(() => {
            const x = document.getElementById('email')
            if (x)
                x.focus()
        }, 600);
    }, [])


    return (
        <div className='container login'>
            <h3 className='login__title'>Sistema de gestão de débitos de outorgas do Transporte Intermunicipal - Seinfra MG</h3>
            <div className='login__form paper'>
                <header>
                    <h4 className="login__subtitle">Entre com usuário do sistema CadTI</h4>
                </header>
                <section className='login__form'>
                    {loginForm.map(({ name, label, type = 'text', ...el }) => (
                        <div className="input" key={name}>
                            <TextField
                                id={name}
                                name={name}
                                label={label}
                                value={data[name] || ''}
                                onChange={handleInput}
                                type={type}
                                InputProps={{ style: { width: '260px' } }}
                                InputLabelProps={{ style: { fontSize: '10pt', color: '#223' } }}
                            >
                            </TextField>
                        </div>
                    ))}
                    <CustomButton label='Entrar' onClick={handleSubmit} />
                </section>

            </div>
        </div>
    );
};

export default UserAuthTemplate;
