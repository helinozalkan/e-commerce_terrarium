// src/data/products.js

// 15 FARKLI SATICI LİSTESİ
const sellers = [
  "Cam Dünyası", "Yeşil Sera", "Hobi Market", "Taş Dünyası", "Doğa Sanat",
  "Bitki Atölyesi", "Toprak Ana", "Minyatür Bahçem", "Cam ve Işık", "Sırlı Seramikler",
  "Dokuma Tezgahı", "Deri İşleri", "Ahşap Tasarım", "Gümüşçü", "Ekolojik Yaşam"
];

// Satıcıları ürünlere dağıtmak için yardımcı fonksiyon
const getSeller = (index) => sellers[index % sellers.length];

export const allProducts = [
  // 1. KATEGORİ: FANUSLAR
  { id: 1,  name: "Geometrik Prizma Fanus", category: "Fanuslar", rating: 4.8, description: "El yapımı bakır çıtalı modern teraryum fanusu.", price: 1250, image: "fanus_geometrik.jpg", stock: 3, seller: "Cam Dünyası" },
  { id: 2,  name: "Elma Cam Fanus (Orta)", category: "Fanuslar", rating: 4.2, description: "Klasik elma formunda üfleme cam fanus.", price: 450,  image: "fanus_elma.jpg",      stock: 8, seller: "Cam ve Işık" },
  { id: 3,  name: "Armut Cam Fanus", category: "Fanuslar", rating: 4.5, description: "Zarif armut tasarımıyla şık bir görünüm.", price: 485, image: "fanus_armut.jpg",     stock: 7, seller: "Cam Dünyası" },
  { id: 4,  name: "Silindir Vazo (Büyük)", category: "Fanuslar", rating: 3.9, description: "Minimalist tasarımlar için yüksek silindir cam.", price: 550, image: "fanus_silindir.jpg", stock: 6, seller: "Doğa Sanat" },
  { id: 5,  name: "Asılabilir Top Fanus", category: "Fanuslar", rating: 4.1, description: "Makrome iplerle asmaya uygun, düz tabanlı.", price: 320, image: "fanus_top.jpg", stock: 10, seller: "Yeşil Sera" },
  { id: 6,  name: "Yumurta Cam Teraryum", category: "Fanuslar", rating: 4.6, description: "Oval hatlarıyla bitkiler için geniş alan sağlar.", price: 390, image: "fanus_yumurta.jpg", stock: 9, seller: "Cam ve Işık" },
  { id: 7,  name: "Altıgen Kapaklı Kutu", category: "Fanuslar", rating: 5.0, description: "Geometrik cam kapaklı saklama ve sergileme kutusu.", price: 950, image: "fanus_ucgen.jpg", stock: 4, seller: "Taş Dünyası" },
  { id: 8,  name: "Mantar Kapaklı Şişe", category: "Fanuslar", rating: 4.3, description: "Nemli ekosistemler (Mossarium) için ideal.", price: 620, image: "fanus_sise.jpg", stock: 5, seller: "Doğa Sanat" },
  { id: 9,  name: "Diyagonal Ağızlı Kase", category: "Fanuslar", rating: 4.0, description: "Kolay müdahale edilebilir, eğik ağızlı cam.", price: 290, image: "fanus_diyagonal.jpg", stock: 12, seller: "Cam Dünyası" },
  { id: 10, name: "Kadeh Ayaklı Fanus", category: "Fanuslar", rating: 4.7, description: "Yüksek ayaklı, sunum için gösterişli fanus.", price: 750, image: "fanus_kadeh.jpg", stock: 4, seller: "Cam ve Işık" },

  // 2. KATEGORİ: BİTKİLER
  { id: 11, name: "Sukulent Mix (3'lü)", category: "Bitkiler", rating: 4.9, description: "Teraryum uyumlu 3 farklı mini sukulent.", price: 225, image: "bitki_sukulent.jpg", stock: 18, seller: "Yeşil Sera" },
  { id: 12, name: "Fittonia (Kırmızı)", category: "Bitkiler", rating: 4.4, description: "Nemli ortamları seven kırmızı damarlı yapraklar.", price: 145, image: "bitki_fittonia.jpg", stock: 14, seller: "Bitki Atölyesi" },
  { id: 13, name: "Canlı Yosun (Moss)", category: "Bitkiler", rating: 4.1, description: "Teraryum zeminini kaplamak için canlı plaka yosun.", price: 180, image: "bitki_moss.jpg", stock: 22, seller: "Ekolojik Yaşam" },
  { id: 14, name: "Tillandsia (Hava Bitkisi)", category: "Bitkiler", rating: 4.8, description: "Toprağa ihtiyaç duymayan özel hava bitkisi.", price: 310, image: "bitki_tillandsia.jpg", stock: 10, seller: "Hobi Market" },
  { id: 15, name: "Minyatür Kaktüs Seti", category: "Bitkiler", rating: 4.5, description: "Dikenli ve dayanıklı 5'li mini kaktüs paketi.", price: 290, image: "bitki_kaktus.jpg", stock: 12, seller: "Minyatür Bahçem" },
  { id: 16, name: "Pilea (Çin Parası)", category: "Bitkiler", rating: 4.2, description: "Yuvarlak yapraklı, şans getirdiğine inanılan bitki.", price: 165, image: "bitki_pilea.jpg", stock: 9, seller: "Yeşil Sera" },
  { id: 17, name: "Echeveria Rozet", category: "Bitkiler", rating: 4.6, description: "Gül formunda, etli yapraklı popüler sukulent.", price: 110, image: "bitki_echeveria.jpg", stock: 20, seller: "Bitki Atölyesi" },
  { id: 18, name: "Teraryum Sarmaşığı", category: "Bitkiler", rating: 3.8, description: "Ficus Pumila, hızlı yayılan minik yapraklı sarmaşık.", price: 155, image: "bitki_sarmasik.jpg", stock: 8, seller: "Ekolojik Yaşam" },
  { id: 19, name: "Tavşan Kulağı Kaktüs", category: "Bitkiler", rating: 4.7, description: "Opuntia microdasys, sevimli görünümüyle popüler.", price: 135, image: "bitki_tavsan.jpg", stock: 11, seller: "Minyatür Bahçem" },
  { id: 20, name: "Haworthia Zebra", category: "Bitkiler", rating: 4.3, description: "Çizgili desenleriyle dikkat çeken dayanıklı tür.", price: 150, image: "bitki_zebra.jpg", stock: 16, seller: "Yeşil Sera" },

  // 3. KATEGORİ: MALZEMELER
  { id: 21, name: "Teraryum Toprağı (2L)", category: "Malzemeler", rating: 4.8, description: "Sukulent ve kaktüsler için özel geçirgen karışım.", price: 120, image: "malz_toprak.jpg", stock: 35, seller: "Toprak Ana" },
  { id: 22, name: "Aktif Karbon", category: "Malzemeler", rating: 4.5, description: "Bakteri ve koku oluşumunu engelleyen filtrasyon.", price: 95, image: "malz_karbon.jpg", stock: 40, seller: "Doğa Sanat" },
  { id: 23, name: "Lav Kırığı (Drenaj)", category: "Malzemeler", rating: 4.6, description: "Taban drenajı için volkanik kırmızı taş.", price: 85, image: "malz_lav.jpg", stock: 28, seller: "Taş Dünyası" },
  { id: 24, name: "Beyaz Dekor Kumu", category: "Malzemeler", rating: 4.2, description: "İnce taneli, parlak beyaz silis kumu.", price: 75, image: "malz_kum_beyaz.jpg", stock: 50, seller: "Toprak Ana" },
  { id: 25, name: "Sphagnum Yosunu", category: "Malzemeler", rating: 4.7, description: "Su tutma kapasitesi yüksek kuru yosun lifleri.", price: 190, image: "malz_sphagnum.jpg", stock: 18, seller: "Yeşil Sera" },
  { id: 26, name: "Doğal Dere Çakılı", category: "Malzemeler", rating: 4.1, description: "Nehir yatağından toplanmış yuvarlak hatlı taşlar.", price: 65, image: "malz_cakil.jpg", stock: 60, seller: "Taş Dünyası" },
  { id: 27, name: "Mavi Kristal Kum", category: "Malzemeler", rating: 4.0, description: "Su efekti vermek için cam kırığı görünümlü kum.", price: 90, image: "malz_kum_mavi.jpg", stock: 25, seller: "Toprak Ana" },
  { id: 28, name: "Vermikülit", category: "Malzemeler", rating: 4.4, description: "Toprağı havalandıran ve nem dengesini sağlayan mineral.", price: 60, image: "malz_vermikulit.jpg", stock: 45, seller: "Hobi Market" },
  { id: 29, name: "Ağaç Kabuğu (Bark)", category: "Malzemeler", rating: 4.3, description: "Zemin örtücü doğal çam kabukları.", price: 85, image: "malz_kabuk.jpg", stock: 30, seller: "Doğa Sanat" },
  { id: 30, name: "Kuru Yosun (Dekor)", category: "Malzemeler", rating: 4.6, description: "Bakım gerektirmeyen şoklanmış yeşil yosun.", price: 145, image: "malz_kuru_yosun.jpg", stock: 22, seller: "Yeşil Sera" },

  // 4. KATEGORİ: DEKOR
  { id: 31, name: "Minyatür Ahşap Ev", category: "Dekor", rating: 4.9, description: "El boyaması sevimli minyatür dağ evi.", price: 95, image: "dekor_ev.jpg", stock: 40, seller: "Ahşap Tasarım" },
  { id: 32, name: "Yapay Göl Jeli", category: "Dekor", rating: 4.1, description: "Isıtılarak sıvılaşan, donunca su görünümü veren jel.", price: 210, image: "dekor_jel.jpg", stock: 16, seller: "Cam Dünyası" },
  { id: 33, name: "Mantar Seti (3'lü)", category: "Dekor", rating: 4.8, description: "Kırmızı benekli minik mantar figürleri.", price: 65, image: "dekor_mantar.jpg", stock: 55, seller: "Hobi Market" },
  { id: 34, name: "Oturan Çift Figürü", category: "Dekor", rating: 4.5, description: "Romantik teraryumlar için bankta oturan çift.", price: 110, image: "dekor_cift.jpg", stock: 25, seller: "Sırlı Seramikler" },
  { id: 35, name: "Sokak Lambası", category: "Dekor", rating: 4.2, description: "Vintage görünümlü minyatür sokak aydınlatması.", price: 85, image: "dekor_lamba.jpg", stock: 30, seller: "Hobi Market" },
  { id: 36, name: "Driftwood (Yalı Dalı)", category: "Dekor", rating: 4.7, description: "Doğal formlu, sterilize edilmiş dekoratif dal.", price: 145, image: "dekor_dal.jpg", stock: 18, seller: "Ahşap Tasarım" },
  { id: 37, name: "Yapay Çim Parçası", category: "Dekor", rating: 3.9, description: "Bahçe görünümü için kesilebilir çim halı.", price: 55, image: "dekor_cim.jpg", stock: 70, seller: "Hobi Market" },
  { id: 38, name: "Taş Köprü", category: "Dekor", rating: 4.6, description: "Reçineden yapılmış eski taş köprü modeli.", price: 95, image: "dekor_kopru.jpg", stock: 32, seller: "Sırlı Seramikler" },
  { id: 39, name: "Beyaz Çit", category: "Dekor", rating: 4.3, description: "Esnek yapılı, şekil verilebilir minyatür çit.", price: 65, image: "dekor_cit.jpg", stock: 50, seller: "Ahşap Tasarım" },
  { id: 40, name: "Tavşan Figürü", category: "Dekor", rating: 4.8, description: "Beyaz sevimli minyatür tavşan biblosu.", price: 60, image: "dekor_tavsan.jpg", stock: 44, seller: "Sırlı Seramikler" },

  // 5. KATEGORİ: BAKIM
  { id: 41, name: "Teraryum Cımbızı (30cm)", category: "Bakım", rating: 4.9, description: "Dar ağızlı fanuslar için uzun, eğri uçlu cımbız.", price: 185, image: "bakim_cimbiz.jpg", stock: 14, seller: "Hobi Market" },
  { id: 42, name: "Su Spreyi (Cam)", category: "Bakım", rating: 4.7, description: "Bitkileri nemlendirmek için şık cam sprey şişesi.", price: 245, image: "bakim_sprey.jpg", stock: 12, seller: "Cam Dünyası" },
  { id: 43, name: "Mini Tırmık & Kürek", category: "Bakım", rating: 4.4, description: "3 parçalı ahşap saplı mini bahçıvan seti.", price: 160, image: "bakim_set.jpg", stock: 20, seller: "Ahşap Tasarım" },
  { id: 44, name: "Budama Makası", category: "Bakım", rating: 4.6, description: "İnce dallar ve yapraklar için hassas makas.", price: 215, image: "bakim_makas.jpg", stock: 9, seller: "Yeşil Sera" },
  { id: 45, name: "Temizleme Fırçası", category: "Bakım", rating: 4.1, description: "Yaprak üzerindeki tozları ve toprağı temizlemek için.", price: 75, image: "bakim_firca.jpg", stock: 26, seller: "Hobi Market" },
  { id: 46, name: "Sıvı Gübre", category: "Bakım", rating: 4.3, description: "Yeşil yapraklı bitkiler için besin takviyesi.", price: 125, image: "bakim_gubre.jpeg", stock: 18, seller: "Toprak Ana" },
  { id: 47, name: "Kurulum Eldiveni", category: "Bakım", rating: 4.0, description: "Kaktüs dikimi için koruyucu nitril eldiven.", price: 45, image: "bakim_eldiven.jpg", stock: 40, seller: "Ekolojik Yaşam" },
  { id: 48, name: "Sulama Damlalığı", category: "Bakım", rating: 4.5, description: "Kök dibine hassas su vermek için uzun uçlu şişe.", price: 95, image: "bakim_damlalik.jpg", stock: 22, seller: "Cam ve Işık" },
  { id: 49, name: "Bitki Yapıştırıcısı", category: "Bakım", rating: 4.2, description: "Hava bitkilerini sabitlemek için bitki dostu jel.", price: 165, image: "bakim_yapistirici.jpg", stock: 15, seller: "Hobi Market" },
  { id: 50, name: "Kurulum Rehberi", category: "Bakım", rating: 4.8, description: "Adım adım teraryum yapımını anlatan kitapçık.", price: 85, image: "bakim_kitap.jpeg", stock: 30, seller: "Doğa Sanat" },
];

export const categories = ["Tümü", "Fanuslar", "Bitkiler", "Malzemeler", "Dekor", "Bakım"];