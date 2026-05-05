const API_URL = "http://localhost:8080/api/products";
let editingProductId = null;
let currentPage = 0;
const pageSize = 4;

async function fetchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    // Si on cherche, on désactive temporairement la pagination visuelle pour simplifier
    if (searchTerm) {
        document.getElementById('pagination').style.display = 'none';
        try {
            const response = await fetch(API_URL);
            let products = await response.json();
            products = products.filter(p => p.name.toLowerCase().includes(searchTerm));
            renderTable(products);
        } catch (e) { console.error(e); }
        return;
    }

    document.getElementById('pagination').style.display = 'flex';
    try {
        const response = await fetch(`${API_URL}/paged?page=${currentPage}&size=${pageSize}`);
        const data = await response.json();
        
        renderTable(data.content);
        
        // Update UI Pagination
        document.getElementById('page-info').innerText = `Page ${data.number + 1} / ${data.totalPages || 1}`;
        document.getElementById('prev-page').disabled = data.first;
        document.getElementById('next-page').disabled = data.last;
    } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
    }
}

function renderTable(products) {
    const tableBody = document.getElementById('product-list');
    tableBody.innerHTML = '';
    products.forEach(product => {
        tableBody.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price} €</td>
                <td>${product.quantity}</td>
                <td>
                    <button class="btn-edit" onclick="editProduct(${product.id}, '${product.name}', ${product.price}, ${product.quantity})">Modifier</button>
                    <button class="btn-delete" onclick="deleteProduct(${product.id})">Supprimer</button>
                </td>
            </tr>
        `;
    });
}

function changePage(delta) {
    currentPage += delta;
    fetchProducts();
}

async function saveProduct() {
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;

    if (!name || !price || !quantity) return alert("Veuillez remplir tous les champs");
    
    if (parseFloat(price) < 0 || parseInt(quantity) < 0) {
        return alert("Le prix et la quantité ne peuvent pas être négatifs !");
    }

    const product = { name, price: parseFloat(price), quantity: parseInt(quantity) };

    try {
        if (editingProductId) {
            // Mode Modification
            await fetch(`${API_URL}/${editingProductId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });
            editingProductId = null;
            document.getElementById('btn-save').innerText = "Ajouter";
            document.getElementById('btn-cancel').style.display = "none";
        } else {
            // Mode Ajout
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });
        }
        clearForm();
        fetchProducts();
    } catch (error) {
        console.error("Erreur lors de la sauvegarde du produit:", error);
    }
}

function editProduct(id, name, price, quantity) {
    editingProductId = id;
    document.getElementById('name').value = name;
    document.getElementById('price').value = price;
    document.getElementById('quantity').value = quantity;
    document.getElementById('btn-save').innerText = "Mettre à jour";
    document.getElementById('btn-cancel').style.display = "inline-block";
}

function cancelEdit() {
    editingProductId = null;
    clearForm();
    document.getElementById('btn-save').innerText = "Ajouter";
    document.getElementById('btn-cancel').style.display = "none";
}

async function deleteProduct(id) {
    if (!confirm("Supprimer ce produit ?")) return;
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchProducts();
    } catch (error) {
        console.error("Erreur lors de la suppression:", error);
    }
}

function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
}

// Charger les produits au démarrage
document.addEventListener('DOMContentLoaded', fetchProducts);
