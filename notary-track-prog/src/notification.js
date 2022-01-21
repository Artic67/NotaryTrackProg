export const notification = {
    raise : function (notificationText) {
        const notificationContainer = document.querySelector('div.notification-container');

        if (!notificationContainer) { console.error(new Error('Can`t find div with class notification-container')); return;}

        let mainDiv = document.createElement('div');
        let button = document.createElement('button');

        mainDiv.classList.add('notification', 'is-danger');
        button.classList.add('delete', 'delete-notification');

        mainDiv.append(button);
        mainDiv.append(notificationText);

        notificationContainer.append(mainDiv);

        document.querySelectorAll('.notification .delete').forEach(($delete) => {
              const $notification = $delete.parentNode;
          
              $delete.addEventListener('click', () => {
                $notification.parentNode.removeChild($notification);
              });
        });

        setTimeout(() => {
            mainDiv.classList.add('notification-fade-out');
            setTimeout(() => {
                if (mainDiv.parentNode) mainDiv.parentNode.removeChild(mainDiv);
            }, 1000)
        }, 3000)
    }
}