import * as React from 'react';
import Radio from '@mui/material/Radio';
import '../NotesStyles/RadioButtonStyle.css'

function RadioButtons({selectValue, handleChange}) {

  const [selectedValue, setSelectedValue] = React.useState('all')

  function handleChangeValue(e){
    handleChange(e.target)
    setSelectedValue(selectedValue(e.target.value))
  }

  return (
    <div className='radioOptions'>
      <div>
      <Radio
        color='success'
        checked={selectValue === 'all'}
        onChange={handleChangeValue}
        value="all"
      />
      <span>Todos</span>
      </div>
      <div>
      <Radio
        color='success'
        checked={selectValue === 'true'}
        onChange={handleChangeValue}
        value="true"
      />
      <span>Prioridade</span>
      </div>
      <div>
      <Radio
        color='success'
        checked={selectValue === 'false'}
        onChange={handleChangeValue}
        value="false"
      />
      <span>Padrão</span>
      </div>
    </div>
  );
}



export default RadioButtons