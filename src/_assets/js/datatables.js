import 'datatables.net-zf';
import 'datatables.net-responsive-zf';

import '../styles/datatables.scss';

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
