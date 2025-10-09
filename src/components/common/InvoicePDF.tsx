import { useBalance } from "@/hooks/useBalance";
import { IOrderFronted } from "@/types";
import { getFormattedDate } from "@/utils/getFormattedDate";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import Image from "next/image";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#f9f9f9",
  },
  header: {
    marginBottom: 20,
    borderBottom: "1px solid #ccc",
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#2e7d32" },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  infoBlock: { marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  table: {
    width: "100%",
    border: "1px solid #ccc",
    marginTop: 10,
    borderRadius: 4,
  },
  tableHeader: {
    backgroundColor: "#e8f5e9",
    flexDirection: "row",
    borderBottom: "1px solid #ccc",
    fontWeight: "bold",
  },
  tableCellHeader: {
    flex: 1,
    padding: 6,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #eee",
    alignItems: "center",
  },
  tableCell: {
    flex: 1,
    padding: 6,
    textAlign: "center",
  },
  productImage: {
    width: 40,
    height: 40,
    objectFit: "cover",
    borderRadius: 3,
    marginHorizontal: "auto",
  },
  summaryBox: {
    marginTop: 20,
    marginLeft: "auto",
    width: "40%",
    borderTop: "2px solid #2e7d32",
    paddingTop: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
  },
  footer: {
    textAlign: "center",
    marginTop: 30,
    borderTop: "1px solid #ccc",
    paddingTop: 10,
    fontSize: 9,
    color: "#777",
  },
});

const InvoicePDF = ({ order }: { order: IOrderFronted }) => {
  const { subtotal, totalDiscountAmount, serviceFee, totalDeliveryFee, total } =
    useBalance(order.items);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>FarmFresh Invoice</Text>
          <View>
            <Text>Order ID: #{order.id}</Text>
            <Text>Status: {order.status}</Text>
            <Text>Date: {getFormattedDate(new Date(order.createdAt))}</Text>
          </View>
        </View>

        {/* CUSTOMER INFO */}
        <View style={styles.row}>
          <View style={{ width: "48%" }}>
            <Text style={styles.sectionTitle}>Customer Info</Text>
            <View style={styles.infoBlock}>
              <Text>
                {order.customer.firstName} {order.customer.lastName}
              </Text>
              <Text>{order.customer.email}</Text>
              <Text>{order.customer.phone}</Text>
              <Text>{order.customer.address}</Text>
            </View>
          </View>

          {/* SELLER INFO */}
          <View style={{ width: "48%" }}>
            <Text style={styles.sectionTitle}>Seller Info</Text>
            <View style={styles.infoBlock}>
              <Text>FarmFresh</Text>
              <Text>Email: support@farmfresh.com</Text>
              <Text>Phone: +880 1777 000000</Text>
              <Text>Address: Dhaka, Bangladesh</Text>
            </View>
          </View>
        </View>

        {/* ITEMS TABLE */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCellHeader, { flex: 0.7 }]}>Image</Text>
            <Text style={[styles.tableCellHeader, { flex: 2 }]}>
              Product Name
            </Text>
            <Text style={styles.tableCellHeader}>Qty</Text>
            <Text style={styles.tableCellHeader}>Unit Price</Text>
            <Text style={styles.tableCellHeader}>Discount</Text>
            <Text style={styles.tableCellHeader}>Subtotal</Text>
          </View>

          {order.items.map((item) => {
            const { product, quantity } = item;
            const discount =
              ((product.discountRate ?? 0) / 100) * product.price;
            const subtotal = product.price * quantity - discount * quantity;
            return (
              <View style={styles.tableRow} key={item.id}>
                <View style={[styles.tableCell, { flex: 0.7 }]}>
                  <Image
                    src={product.imagesUrl?.[0]?.url}
                    alt="product-image"
                    className="w-16 h-16 rounded-lg object-fill"
                    width={64}
                    height={64}
                  />
                </View>
                <Text style={[styles.tableCell, { flex: 2 }]}>
                  {product.name}
                </Text>
                <Text style={styles.tableCell}>{quantity}</Text>
                <Text style={styles.tableCell}>
                  ${product.price.toFixed(2)}
                </Text>
                <Text style={styles.tableCell}>-{product.discountRate}%</Text>
                <Text style={styles.tableCell}>${subtotal.toFixed(2)}</Text>
              </View>
            );
          })}
        </View>

        {/* SUMMARY */}
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text>Subtotal:</Text>
            <Text>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Discount:</Text>
            <Text>-${totalDiscountAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Service Fee:</Text>
            <Text>${serviceFee.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Delivery Fee:</Text>
            <Text>${totalDeliveryFee.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Total:</Text>
            <Text>${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text>Thank you for shopping with FarmFresh! 🥦</Text>
          <Text>Visit us again at https://farmfresh.com</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
