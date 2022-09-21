import React, { useState } from 'react';
import Select, { SelectOption } from './components/Select';

const options = [
    { label: 'First', value: 0 },
    { label: 'Second', value: 1 },
    { label: 'Third', value: 2 },
    { label: 'Fourth', value: 3 },
    { label: 'Fifth', value: 4 },
];

export const App: React.FC = () => {
    const [value, setValue] = useState<SelectOption[]>([options[0]]);
    const [value2, setValue2] = useState<SelectOption | undefined>(options[0]);
    return (
        <>
            <Select multiple options={options} value={value} onChange={(option) => setValue(option)} />
            <Select options={options} value={value2} onChange={(option) => setValue2(option)} />
        </>
    );
};

export default App;
