import React from 'react'
import Select from 'react-select'

export const CustomSelect = (props) => {
    return <Select placeholder={'Выберите цвет'} onChange={props.onChange} options={props.options} />

}
