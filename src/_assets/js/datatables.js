import 'datatables.net-zf';
import 'datatables.net-responsive-zf'
import 'datatables.net-zf/css/dataTables.foundation.css';
import 'datatables.net-responsive-zf/css/responsive.foundation.css'

$(document).ready(function () {
  $('#datatables').DataTable({
    "paging": false,
    "info": false,
    "responsive": true,
    "language": {
      "search": "Recherche :"
    }
  });
});