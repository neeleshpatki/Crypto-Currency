// script.js

const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr";

// Fetch cryptocurrency data
function fetchCryptoData() {
    $.ajax({
        url: API_URL,
        method: "GET",
        success: function(data) {
            populateTable(data);
        },
        error: function() {
            alert("Error fetching cryptocurrency data. Please try again.");
        }
    });
}

// Populate the table with data
function populateTable(data) {
    const tableBody = $("#cryptoTable");
    tableBody.empty(); // Clear existing rows

    data.forEach(crypto => {
        const row = `
            <tr>
                <td>${crypto.name}</td>
                <td>${crypto.symbol.toUpperCase()}</td>
                <td>₹${crypto.current_price.toLocaleString()}</td>
            </tr>
        `;
        tableBody.append(row);
    });
}

// Filter table based on search input
function filterTable() {
    const query = $("#searchBar").val().toLowerCase();
    $("#cryptoTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(query) > -1);
    });
}

// Event Listeners
$(document).ready(function() {
    fetchCryptoData(); // Initial fetch

    // Refresh button functionality
    $("#refreshButton").on("click", function() {
        fetchCryptoData();
    });

    // Search bar functionality
    $("#searchBar").on("keyup", function() {
        filterTable();
    });
});
