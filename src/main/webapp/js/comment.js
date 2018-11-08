let commentFormBtn = document.querySelector('#comment-submit');
let commentList = document.querySelector('#comment-list');
let recommentList = document.querySelectorAll('.recomment');
let recommentFormBtnList = document.querySelectorAll('.recomment-comment-submit');

// 댓글 form버튼 클릭 이벤트 처리
commentFormBtn.addEventListener('click', () => {
    console.log('commentFormBtn clicked!');
    let contentValue = document.getElementById('content').value;    // input 태그에 입력된 comment
    let boardId = document.getElementById('board-id').value;        // 댓글이 속해있는 게시물의 id
    let memberId = document.getElementById('auth-user-id').value;      //
    let memberName = document.getElementById('member-name').value;  //
    let regDate = document.getElementById('reg-date').value;        //

    let commentData = {
        'content': contentValue,
        'memberId': memberId
    };
    console.log(`commentData: ${commentData}`);
    // 댓글 입력창 clear
    document.getElementById('content').value = '';

    // BoardCommentController.submitComment()로 POST 요청 보냄
    $.ajax({
        method: 'POST',
        contentType: 'application/json; charset=UTF-8',
        accept: 'application/json',
        url: `/boards/${boardId}/comment`,
        data: JSON.stringify(commentData),  // commentData: BoardCommentController에게 전송할 데이터
        dataType: 'text',                   // 'json'으로 하면 에러 발생
        success: function(data) {           // data: BoardCommentController로부터 받은 리턴값
            console.log('댓글 등록 성공');
            appendLatestComment(memberName, commentData.content, regDate);
        },
        error: handleAjaxError
    });
});

// 각 댓글마다 '댓글' 버튼을 누르면 대댓글 form이 등장하거나 사라짐(toggle)
for (let i = 0; i < recommentList.length; i++) {
    recommentList[i].addEventListener('click', () => {
        let recommentForm = recommentList[i].parentElement.nextElementSibling;
        toggle(recommentForm);
    });
}

// 대댓글 form버튼 클릭 이벤트 처리
for (let i = 0; i < recommentFormBtnList.length; i++) {
    recommentFormBtnList[i].addEventListener('click', () => {
        console.log('recommentFormBtn clicked!');
        let recommentForm = recommentFormBtnList[i];
        let contentValue = recommentForm.parentElement.querySelector('.recomment-content').value;
        let boardId = recommentForm.parentElement.querySelector('.recomment-board-id').value;
        let parentCommentId = recommentForm.parentElement.querySelector('.recomment-parent-comment-id').value;
        let seq = recommentForm.parentElement.querySelector('.recomment-seq').value;
        let memberId = recommentForm.parentElement.querySelector('.recomment-member-id').value;

        let commentData = {
            'content': contentValue,
            'memberId': memberId,
            'parentCommentId': parentCommentId,
            'seq': seq
        };
        console.log(`recommentData: ${commentData}`);
        // 대댓글 입력창 clear
        contentValue.value = '';

        // BoardCommentController.submitComment()로 POST 요청 보냄
        $.ajax({
            method: 'POST',
            contentType: 'application/json; charset=UTF-8',
            accept: 'application/json',
            url: `/boards/${boardId}/recomment`,
            data: JSON.stringify(commentData),  // commentData: BoardCommentController에게 전송할 데이터
            dataType: 'text',                   // 'json'으로 하면 에러 발생
            success: function(data) {           // data: BoardCommentController로부터 받은 리턴값
                console.log('대댓글 등록 성공');
                //TODO - 입력한 댓글을 리스트에 반영하는 코드 필요

            },
            error: handleAjaxError
        });
    });
}


/**
 * Ajax error 로그 표시
 */
function handleAjaxError() {
    console.log('comment AJAX call error.');
}

/**
 * 추가한 댓글을 댓글 목록 맨 위에 붙이는 함수
 * @param name
 * @param content
 * @param regDate
 */
function appendLatestComment(name, content, regDate) {
    let tr = document.createElement('tr');
    tr.setAttribute('id', 'tr');
    commentList.insertAdjacentElement('afterbegin', tr);

    let tdName = document.createElement('td');
    let tdContent = document.createElement('td');
    let tdRegDate = document.createElement('td');
    let tdReply = document.createElement('td');
    let tdDelete = document.createElement('td');
    tdName.innerHTML = name;
    tdContent.innerHTML = content;
    tdRegDate.innerHTML = regDate;
    tdReply.innerHTML = '댓글 달기';
    tdDelete.innerHTML = '삭제';
    tr.insertAdjacentElement('afterbegin', tdDelete);
    tr.insertAdjacentElement('afterbegin', tdReply);
    tr.insertAdjacentElement('afterbegin', tdRegDate);
    tr.insertAdjacentElement('afterbegin', tdContent);
    tr.insertAdjacentElement('afterbegin', tdName);
}

/**
 * 대댓글 form toggle하는 함수
 */
function toggle(elem) {
    // 댓글 form이 보이는 상태면 안보이도록
    if (window.getComputedStyle(elem).display === 'block') {
        elem.style.display = 'none';
        return;
    }
    // 안보이는 상태면 보이도록
    elem.style.display = 'block';
};