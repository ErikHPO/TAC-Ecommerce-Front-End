import { Pagination } from '@mui/material';
import React from 'react';


function ProductPagination(props) {
    return (
        <div>
            
            <Pagination count={10} variant="outlined" shape="rounded" />
        </div>
    );
}

export default ProductPagination;