import { Button, Input } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useMemo, useState } from 'react';
import DataTable from "react-data-table-component";
import firebaseInstance from 'services/firebase';
import Loading from 'utils/Loading';

const columns = [
    {
        name: 'Producto',
        selector: row => row.Producto,
        sortable: true
    },
    {
        name: 'Precio',
        selector: row => row.Precio,
        sortable: true
    },
    {
        name: 'Stock',
        selector: row => row.Stock,
        sortable: true
    },
];

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
      <Input
        id="search"
        type="text"
        placeholder="Buscar producto"
        value={filterText}
        onChange={onFilter}
      />
      <Button
        className="btn btn-outline-secondary text-light"
        onClick={onClear}
      >
        X
      </Button>
    </>
  );

const Productos = () => {
    const [Productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterText, setFilterText] =useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const filteredItems = Productos.filter(
		item => item.Producto && item.Producto.toLowerCase().includes(filterText.toLowerCase()),
	);

    const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<FilterComponent filterText={filterText} onFilter={e => setFilterText(e.target.value)} onClear={handleClear}  />
		);
	}, [filterText, resetPaginationToggle]);

    useEffect(() => {

        firebaseInstance.getProducts().then(prd => {
            const { products } = prd
            setProductos(products)
            setLoading(false)
        })

    }, [])

    if (loading) return <Loading />

    return (
       
                <DataTable
                        columns={columns}
                        data={filteredItems}
                        pagination
                        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        selectableRows
                        persistTableHead
                    />
             
    );
};

export default Productos;
