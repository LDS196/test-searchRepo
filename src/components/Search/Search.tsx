import React, { ChangeEvent, FC, useEffect, useState } from "react"
import useDebounce from "../../hooks/useDebounce"
import s from "./Search.module.scss"

type PropsType = {
    setSearchValue: (value: string) => void
    searchName: string
    changePage: (value: number) => void
}
export const Search: FC<PropsType> = (props) => {
    const { setSearchValue, searchName, changePage } = props

    const [value, setValue] = useState(searchName)
    const debouncedValue = useDebounce<string>(value, 500)
    const [firstRender, setFirstRender] = useState(true)
    useEffect(() => {
        if (searchName === "") {
            setValue("")
        }
    }, [searchName])
    useEffect(() => {
        if (!firstRender) {
            changePage(0)
            setSearchValue(value)
        }
        setFirstRender(false)
    }, [debouncedValue])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    return (
        <div>
            <input
                className={s.searchInput}
                onChange={handleChange}
                value={value}
                id="search"
                name="search"
                placeholder={"Provide your text"}
            />
        </div>
    )
}
