package crm.product.test;

import crm.product.service.ProductSerice;

import java.sql.SQLException;

public class ProductTest {
    public static void main(String[] args) {

        ProductSerice productSerice = new ProductSerice();

            System.out.println(productSerice.viewProInfo());

    }
}
