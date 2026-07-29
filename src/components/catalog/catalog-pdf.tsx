import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer"
import type { Category } from "@/lib/strapi"

// ============================================================================
// Paleta SNACK PRO (misma identidad del sitio)
// ============================================================================
const COLORS = {
  black: "#0a0a0a",
  panel: "#141414",
  red: "#e51b24",
  white: "#ffffff",
  gray: "#a3a3a3",
  border: "#2a2a2a",
}

const styles = StyleSheet.create({
  // ---- Portada ----
  cover: {
    backgroundColor: COLORS.black,
    color: COLORS.white,
    height: "100%",
    padding: 48,
    justifyContent: "space-between",
  },
  coverTopBar: {
    height: 6,
    width: 80,
    backgroundColor: COLORS.red,
    marginBottom: 24,
  },
  coverBrand: {
    fontSize: 34,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1,
  },
  coverTitle: {
    fontSize: 52,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1.05,
    marginTop: 8,
  },
  coverSubtitle: {
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 16,
    maxWidth: 340,
    lineHeight: 1.5,
  },
  coverFooter: {
    fontSize: 10,
    color: COLORS.gray,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 16,
  },

  // ---- Páginas de contenido ----
  page: {
    backgroundColor: COLORS.black,
    color: COLORS.white,
    paddingTop: 40,
    paddingBottom: 48,
    paddingHorizontal: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 10,
  },
  headerBrand: { fontSize: 12, fontFamily: "Helvetica-Bold" },
  headerRed: { color: COLORS.red },
  headerMeta: { fontSize: 9, color: COLORS.gray },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionBar: {
    width: 4,
    height: 18,
    backgroundColor: COLORS.red,
    marginRight: 8,
  },
  sectionTitle: { fontSize: 20, fontFamily: "Helvetica-Bold" },
  sectionCount: { fontSize: 9, color: COLORS.gray, marginLeft: 8 },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    width: "31.5%",
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 10,
  },
  cardImageWrap: {
    height: 90,
    borderRadius: 6,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    overflow: "hidden",
  },
  cardImage: { height: 90, objectFit: "contain" },
  cardImagePlaceholder: { fontSize: 8, color: COLORS.gray },
  cardBrand: { fontSize: 7, color: COLORS.red, fontFamily: "Helvetica-Bold" },
  cardName: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    marginTop: 2,
    lineHeight: 1.2,
  },
  cardMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  cardFormat: { fontSize: 8, color: COLORS.gray },
  cardPrice: { fontSize: 10, fontFamily: "Helvetica-Bold", color: COLORS.white },
  featuredTag: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: COLORS.red,
    color: COLORS.white,
    fontSize: 6,
    fontFamily: "Helvetica-Bold",
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 3,
  },

  pageNumber: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: COLORS.gray,
  },
})

function formatPrice(price?: number) {
  if (price == null) return null
  return "$" + price.toLocaleString("es-CL")
}

// Resuelve rutas relativas (/products/x.png) a URL absoluta para el PDF
function absoluteUrl(url?: string) {
  if (!url) return undefined
  if (url.startsWith("http")) return url
  if (typeof window !== "undefined") return `${window.location.origin}${url}`
  return url
}

interface Props {
  categories: Category[]
}

export function CatalogPdf({ categories }: Props) {
  const totalProducts = categories.reduce((n, c) => n + c.products.length, 0)
  const dateLabel = new Date().toLocaleDateString("es-CL", {
    month: "long",
    year: "numeric",
  })

  return (
    <Document
      title="Catálogo SNACK PRO"
      author="SNACK PRO"
      subject="Catálogo de productos"
    >
      {/* ===== Portada ===== */}
      <Page size="A4">
        <View style={styles.cover}>
          <View>
            <View style={styles.coverTopBar} />
            <Text style={styles.coverBrand}>
              <Text style={styles.headerRed}>SNACK</Text> PRO
            </Text>
          </View>

          <View>
            <Text style={styles.coverTitle}>Catálogo de{"\n"}Productos</Text>
            <Text style={styles.coverSubtitle}>
              Snacks, bebidas y máquinas vending para tu empresa. Nuestra
              selección completa, actualizada a {dateLabel}.
            </Text>
          </View>

          <Text style={styles.coverFooter}>
            {categories.length} categorías · {totalProducts} productos ·
            www.snackpro.cl
          </Text>
        </View>
      </Page>

      {/* ===== Una página por categoría ===== */}
      {categories.map((cat) => (
        <Page key={cat.slug} size="A4" style={styles.page} wrap>
          <View style={styles.header} fixed>
            <Text style={styles.headerBrand}>
              <Text style={styles.headerRed}>SNACK</Text> PRO
            </Text>
            <Text style={styles.headerMeta}>Catálogo · {dateLabel}</Text>
          </View>

          <View style={styles.sectionTitleRow}>
            <View style={styles.sectionBar} />
            <Text style={styles.sectionTitle}>{cat.name}</Text>
            <Text style={styles.sectionCount}>
              {cat.products.length} productos
            </Text>
          </View>

          <View style={styles.grid}>
            {cat.products.map((p) => {
              const img = absoluteUrl(p.imageUrl)
              const price = formatPrice(p.price)
              return (
                <View key={p.id} style={styles.card} wrap={false}>
                  {p.featured && <Text style={styles.featuredTag}>DESTACADO</Text>}
                  <View style={styles.cardImageWrap}>
                    {img ? (
                      <Image src={img} style={styles.cardImage} />
                    ) : (
                      <Text style={styles.cardImagePlaceholder}>SNACK PRO</Text>
                    )}
                  </View>
                  {p.brand && <Text style={styles.cardBrand}>{p.brand.toUpperCase()}</Text>}
                  <Text style={styles.cardName}>{p.name}</Text>
                  <View style={styles.cardMetaRow}>
                    {p.format ? (
                      <Text style={styles.cardFormat}>{p.format}</Text>
                    ) : (
                      <Text style={styles.cardFormat}> </Text>
                    )}
                    {price && <Text style={styles.cardPrice}>{price}</Text>}
                  </View>
                </View>
              )
            })}
          </View>

          <View style={styles.pageNumber} fixed>
            <Text>SNACK PRO</Text>
            <Text
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
              }
            />
          </View>
        </Page>
      ))}
    </Document>
  )
}
