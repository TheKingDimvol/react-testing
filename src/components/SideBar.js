import React from 'react'
import SideBarItem from './SideBarItem'
import { Dropdown } from 'react-bootstrap'
import { usePopup } from '../contexts/PopupsContext';

export default function SideBar({ desk }) {
    const { setAddNodeShow, setDeleteNodeShow } = usePopup()

    return (
        <div className="sidenav">
            <SideBarItem title={' Поиск '}>
                <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                </SideBarItem>
            <SideBarItem title={ 'Вершины' }>
                <Dropdown.Item eventKey="1" onClick={() => setAddNodeShow(true)}>
                    <h5>Добавить вершину</h5>
                </Dropdown.Item>
                <Dropdown.Item eventKey="1" onClick={() => false}>
                    <h5>Изменить вершину</h5>
                </Dropdown.Item>
                <Dropdown.Item eventKey="1" onClick={() => setDeleteNodeShow(true)}>
                    <h5>Удалить вершину</h5>
                </Dropdown.Item>
            </SideBarItem>
            <SideBarItem title={' Рёбра '}>
                <Dropdown.Item eventKey="1" onClick={() => false}>
                    <h5>Связать вершины</h5>
                </Dropdown.Item>
            </SideBarItem>
            <SideBarItem title={' Фильтры '}>
                <Dropdown.Item eventKey="1" onClick={() => false}>
                    <h5>В разработке</h5>
                </Dropdown.Item>
            </SideBarItem>
            <SideBarItem title={' Экспорт '}>
                <Dropdown.Item eventKey="1" onClick={() => false}>
                    <h5>В разработке</h5>
                </Dropdown.Item>
            </SideBarItem>
        </div>
    )
}
