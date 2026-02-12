// Ждем готовности SDK
OBR.onReady(() => {
    console.log("Лист персонажа готов!");
    
    // Пример: сохранение данных в метаданные комнаты (опционально)
    const strengthInput = document.getElementById('strength');
    
    strengthInput.addEventListener('change', async (e) => {
        const value = e.target.value;
        // Здесь можно добавить код для автоматического пересчета модификаторов
        console.log("Новая Сила:", value);
    });
});
