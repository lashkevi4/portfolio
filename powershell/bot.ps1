
# Настройка протокола TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Функция для генерации имени файла лога
function Get-LogFileName {
    $currentDateTime = Get-Date -Format "dd-MM-yy-HH-mm-ss"
    $logFileName = "C:\temp\bot-$currentDateTime.log"
    return $logFileName
}

# Создание файла лога и папки, если необходимо
$logFile = Get-LogFileName
if (-not (Test-Path "C:\temp")) {
    New-Item -ItemType Directory -Path "C:\temp"
}
if (-not (Test-Path $logFile)) {
    New-Item -ItemType File -Path $logFile
}

# Токен вашего бота
$BotToken = "6658695903:AAEGqyTex_KPbqtPEGDZXzAVOL6-fwRy_K8"

# Переменная для последнего update_id
$lastUpdateId = 0

# Состояние блокировки порта
$isPortBlocked = $false

# Название правила брандмауэра
$firewallRuleName = "Block RDP Port 3389"

# Функция для логирования
function Write-Log {
    param(
        [string]$message
    )
    $timestamp = Get-Date -Format "dd-MM-yyyy HH:mm:ss"
    Add-Content -Path $logFile -Value "[$timestamp] $message"
}

# Функции для управления портом

function Disable-Port {
    try {
        $existingRule = Get-NetFirewallRule -DisplayName $firewallRuleName -ErrorAction SilentlyContinue
        if (-not $existingRule) {
            New-NetFirewallRule -DisplayName $firewallRuleName -Direction Inbound -Protocol TCP -LocalPort 3389 -Action Block -Profile Any
            $global:isPortBlocked = $true
            Write-Log "Port 3389 disabled"
        } else {
            Write-Log "Firewall rule already exists, no need to disable again"
        }
    } catch {
        Write-Log "Error disabling port 3389: $_"
    }
}


function Enable-Port {
    try {
        $existingRule = Get-NetFirewallRule -DisplayName $firewallRuleName -ErrorAction SilentlyContinue
        if ($existingRule) {
            Remove-NetFirewallRule -DisplayName $firewallRuleName
            $global:isPortBlocked = $false
            Write-Log "Port 3389 enabled and firewall rule removed"
        } else {
            Write-Log "Firewall rule does not exist, no action needed to enable"
        }
    } catch {
        Write-Log "Error enabling port 3389: $_"
    }
}

function Get-PortStatus {
    $existingRule = Get-NetFirewallRule -DisplayName $firewallRuleName -ErrorAction SilentlyContinue
    if ($existingRule) {
        return "blocked"
    } else {
        return "open"
    }
}

# Функция для отправки сообщений в Telegram
function Send-TelegramMessage {
    param(
        [string]$chatId,
        [string]$text
    )
    try {
        $url = "https://api.telegram.org/bot$BotToken/sendMessage?chat_id=$chatId&text=$text"
        Invoke-RestMethod -Uri $url -Method Post
        #Write-Log "Sent message to chat $chatId"
    } catch {
        Write-Log "Error sending message: $_"
    }
}

# Основной цикл бота
while ($true) {
    try {
        $updates = Invoke-RestMethod -Uri "https://api.telegram.org/bot$BotToken/getUpdates?offset=$($lastUpdateId + 1)" -Method Post

        foreach ($update in $updates.result) {
            if ($update.message -and $update.message.text) {
                $chatId = $update.message.chat.id
                $text = $update.message.text
                $updateId = $update.update_id

                # Обновляем $lastUpdateId
                $lastUpdateId = $updateId

                # Логирование
                Write-Log "Received command: $text"

                switch ($text) {
                    "disable" {
                        if (-not $global:isPortBlocked) {
                            Disable-Port
                        }
                        Send-TelegramMessage -chatId $chatId -text "Port 3389 disabled"
                    }
                    "enable" {
                        if ($global:isPortBlocked) {
                            Enable-Port
                        }
                        Send-TelegramMessage -chatId $chatId -text "Port 3389 enabled"
                    }
                    "status" {
                    $portStatus = Get-PortStatus
                    Send-TelegramMessage -chatId $chatId -text "Port 3389 is $portStatus"
                    }
                }
            }
        }
    } catch {
        Write-Log "Error in main loop: $_"
    }
    Start-Sleep -Seconds 5
}
