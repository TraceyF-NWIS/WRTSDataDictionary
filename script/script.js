$(document).ready(function(){

    var jsonData;
    var filteredData;

    fetch ('https://api.jsonbin.io/v3/b/65f30de4dc74654018b2de7d', {
        headers:{
            'secret-key': '$2a$10$jHP.7hlRC9fNWp490WAoiOKzp32rKpsAKehby4nn4icEaXaUxnjpC'
        }
    })

    .then(Response => Response.json())
    .then(data => {
        jsonData = data.record
        filteredData = jsonData
        paginateAndDisplay(1);
        
    })

    .catch(error => {
        console.error('Error fetching data:', error)
    })

    function paginateAndDisplay(page) {
        //pageData = filteredData.slice(startIndex, endIndex);
        var pageSize = 5;
        var pageCount = Math.ceil(filteredData.length / pageSize);
        var startIndex = (page - 1) * pageSize;
        var endIndex = startIndex + pageSize;
        pageData = filteredData.slice(startIndex, endIndex);

        $('#content').empty();

        $.each(pageData, function(index, item){
            $('#content').append('<div class="item ' + item.type + '">\
                                    <h3>' + item.name + '</h3>\
                                    <p class="descriptor">' + item.description + '</p>\
                                    <span class="row">\
                                        <span class="col">\
                                            <span class="status">'
                                                + item.status +
                                            '</span>\
                                        </span>\
                                        <span class="col">\
                                            <span class="reference">'
                                                + item.data +
                                            '</span>\
                                        </span>\
                                        <span class="col">\
                                            <span class="date">'
                                                + item.date +
                                            '</span>\
                                        </span>\
                                    </span>\
                                    </div><br><hr>')

            $("span.status:contains('Active')").addClass('highlight');
            $("span.status:contains('Retired')").addClass('highlight2');

        });

        $('#pagination').empty();

        for (var i = 1; i <= pageCount; i++){
            $('#pagination').append('<li class="page-item"><a class="page-link" href="#">' + i + '</a></li>');
        }

        $('#pagination li').eq(page - 1).addClass('active');
    
    }

    $('#pagination').on('click', '.page-link', function(event) {
        event.preventDefault();
        var page = parseInt($(this).text());
        paginateAndDisplay(page);
    });

    $('#type-filter').change(function() {
        var selectedType = $(this).val();
        if (selectedType === 'all') {
            filteredData = jsonData;
        } else {
            filteredData = jsonData.filter(function(item) {
                return item.type === selectedType;
            });
        }
        paginateAndDisplay(1);
    })
})