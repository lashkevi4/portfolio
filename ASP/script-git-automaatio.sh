# Изменяем текущую рабочую директорию на ASP
cd /Users/aleksandrlashkevich/Documents/Programming/2023/ASP

echo "Current working directory:"
pwd


# Это комментарий: выводим содержимое текущей директории
echo "Listing directory contents..."
ls # Эта команда отобразит содержимое текущей директории


# Добавляем пустые строки для читаемости вывода
echo
echo

# Удаляем существующую директорию 'repo_dir', если она существует (фаза очистки)
rm -rf repo_dir

# Создаем новую директорию 'repo_dir'
mkdir repo_dir

# Переходим в активную директорию 'repo_dir'
cd repo_dir

# Клонируем репозиторий в текущую директорию 'repo_dir'
git clone "https://Penpal147@dev.azure.com/Penpal147/net22esimerkkiporjekti/_git/net22exaaaaample"

echo "отображаем содержимое 'repo_dir' после cloning..."
ls

echo "Press enter to continue"
read
