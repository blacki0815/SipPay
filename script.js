function getSelectedDateQuery() {
  const filter = localStorage.getItem("orderFilter") || "today";
  if (filter === "today") {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    return `?date=${y}-${m}-${d}`;
  }
  return ""; 
}

document.querySelectorAll("#order-filter-overlay input[name='orderFilter']").forEach(input => {
  input.addEventListener("change", e => {
    localStorage.setItem("orderFilter", e.target.value);
    loadOrders(); 
  });
});

const savedFilter = localStorage.getItem("orderFilter") || "today";
document.querySelector(`#order-filter-overlay input[value="${savedFilter}"]`).checked = true;

function loadOrders() {
  fetch(`${BASE_URL}/orders${getSelectedDateQuery()}`)
    .then(res => res.json())
    .then(data => {
    });
}