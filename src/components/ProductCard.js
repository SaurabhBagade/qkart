import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Rating,
    Typography,
} from "@mui/material";
import React from "react";
import Stack from '@mui/material/Stack';
import "./ProductCard.css";
import { styled } from '@mui/material/styles';

const ProductCard = ({ product, handleAddToCart }) => {


    return (
        <Card className="card" >
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={product.image}
            />
            <CardContent>
                <Stack spacing={1.5}>
                    <Typography variant="h6" component="div">
                        {product.name}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }} component="div">
                        ${product.cost}
                    </Typography>
                    <Rating name="read-only" value={product.rating} precision={0.5} readOnly />
                </Stack>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={handleAddToCart} startIcon={<AddShoppingCartOutlined size="large" />} fullWidth>
                    ADD TO CART</Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
