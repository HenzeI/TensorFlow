document.addEventListener("DOMContentLoaded", function () {
    // URL de la API de centros de día en Madrid
    const url = "https://datos.madrid.es/egob/catalogo/200342-0-centros-dia.json";
  
    // Función para obtener los datos de la API
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }
  
    // Función para mostrar los datos en la tabla
    async function renderTable() {
      const data = await fetchData();
      const centros = data["@graph"]; // Accedemos a la lista de centros
                                      // Cuando la propiedad de un objeto 
                                      // cuyos nombres no son identificadores
                                      // válidos para la notación de punto 
                                      // (por ejemplo, porque tienen caracteres
                                      // especiales o espacios), se usa la 
                                      // notación de corchetes.
      // Inicializar DataTables
      const table = $("#centrosTable").DataTable({
        data: centros,
        columns: [
          { data: "title" }, // Nombre del centro
          { data: "address.street-address" }, // Dirección
          { "render": function (data, type, row) {
            return ('<a href=""> ' + row.location.latitude + ' ' + row.location.longitude + ' </a>')
          }},
        ],
        language: {
          url: "https://cdn.datatables.net/plug-ins/1.11.5/i18n/Spanish.json", // Traducir al español
        },
      });
    
      console.log("Hola");

/*       table.on('select', function (e, dt, type, indexes) {
        console.log("Entro al metodo");
        if (type == 'row') {
            let data = table
                    .row(indexes)
                    .data()
                    .pluck('id')
            
            console.log("celda  " + data)
        }
        }) */

/*         table
    .on('key-focus', function (e, datatable, cell, originalEvent) {
        var rowData = datatable.row(cell.index().row).data();
 
        console.log("celda fijada" + rowData[0]);
    })
    .on('key-blur', function (e, datatable, cell) {
        $('#details').html('No cell selected');
    }); */

/*     table.on("click", "tr[role='row']", function(){
        alert($(this).children('td:first-child').text())
    }); */

    }
  
    // Llamar a la función para renderizar la tabla
    renderTable();
  });