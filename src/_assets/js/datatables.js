import 'datatables.net-zf';
import '../../../node_modules/datatables.net-zf/css/dataTables.foundation.css';

$(document).ready(function () {
  $('#datatables').DataTable({
    "paging": false,
    "info": false,
    "language": {
      "search": "Recherche :"
    }
  });
});