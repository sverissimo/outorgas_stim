import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function FreeSolo(props: any) {
    const { data, handleChange } = props

    return (
        <Stack spacing={2} sx={{
            width: 600,
            margin: '0 0 2% 5%'
        }}>
            <Autocomplete

                id="select-empresa-search"
                freeSolo
                options={data.map((option: any) => option.razaoSocial)}
                onChange={(e, value) => handleChange(value)}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        label="Selecione a empresa" />
                }
            />
        </Stack>
    );
}

