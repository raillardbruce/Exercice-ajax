$(document).ready(function () {
    ShowContent();
});

function ShowContent() {

    $.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts',
        type: 'GET',
        dataType: 'json',
        success: function (post) {
            for (let x = 0; x < post.length; x++) {
                $post = post[x];
                $('#tables').append(`
                <!-- Ajout d'un id="row" permettant d'identifier la ligne à supprimer -->
                <tr id="row${$post.id}">
                    <td class="text-center">${$post.userId}</td>
                    <td class="text-center">${$post.id}</td>
                    <td>${$post.title}</td>
                    <td>${$post.body}</td>
                    <td>
                    <!-- Ajout des boutons supprimer et voir plus -->
                    <button type="button" onclick="Show_the_details(${$post.id})" class="btn btn-primary" data-toggle="modal" data-target="#modaldetails"  >Afficher les détails</button>
                    <button type="button" onclick="deleteUser($('#row${$post.id}'))" class="btn btn-warning">Supprimer</button>  
                        </td>
                    </tr>`);
            };
        }
    });
};


function newUser() {

    $userId = $('#userid').val();
    $title = $('#title').val();
    $body = $('#body').val();

    $.post('https://jsonplaceholder.typicode.com/posts/', {
            userId: $userId,
            title: $title,
            body: $body,
        }, function (post) { 
            $('table').append(
                `<tr id='row${post.id}'>
                <td>${post.userId}</td>
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.body}</td>
                <td>
                <button type="button" onclick="Show_the_details(${$post.id})" id="showthedetails" class="btn btn-primary" data-toggle="modal" data-target="#modaldetails" >Afficher les détails</button>
                <button type="button" onclick="deleteUser($('#row${post.id}'))" class="btn btn-warning">Supprimer</button>
                </td>
            </tr>`);

        },
        'json');
};

function Show_the_details(details) {

    $.get('https://jsonplaceholder.typicode.com/posts/' + details,
        function (post) {
            $('#modalbody').html(`
            <p>
                <b> USER ID :</b> ${post.userId}
                <b> ID : </b> ${post.id}
                <b> Title : </b> ${post.title}
                <b> Body : </b> ${post.body}
            </p>`)
        }, 'json');
};

function deleteUser(details) {
    return details.remove();
}
