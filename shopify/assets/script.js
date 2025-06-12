// DOMが完全に読み込まれてからスクリプトを実行するためのラッパー
document.addEventListener('DOMContentLoaded', () => {

    // ヘッダー要素を取得
    const header = document.getElementById('main-header');

    // アニメーション対象の要素を全て取得
    const elementsToAnimate = document.querySelectorAll('.trans-flag');

    // アニメーションを開始させるスクロール位置の閾値 (画面の高さの75%)
    const triggerPoint = window.innerHeight * 0.75;

    elementsToAnimate.forEach(element => {
        // 要素の上端が、画面の上から75%の位置より内側に入ったかどうかを判定
        if (element.getBoundingClientRect().top < triggerPoint) {
            // クラスを付け替えてアニメーションを実行
            element.classList.remove('ani-init');
        }

        element.classList.add('trans');

        // 一度アニメーションした要素は、再度チェックしないようにフラグクラスを削除
        element.classList.remove('trans-flag');
    });

    // スクロール時のイベントリスナーを設定
    window.addEventListener('scroll', () => {
        // スクロール位置が10pxより大きいかどうかをチェック
        if (window.scrollY > 10) {
            // 10pxより多くスクロールされていたら、.scrolledクラスを追加
            if(header && !header.classList.contains('scrolled')){
                header.classList.add('scrolled');
            }
        } else {
            // 10px以下の位置に戻ったら、.scrolledクラスを削除
            if(header && header.classList.contains('scrolled')){
                header.classList.remove('scrolled');
            }
        }

        // アニメーション対象の要素を全て取得 (クラス 'trans', 'ani-call', 'ani-init' を全て持つ要素)
        const elementsToAnimate = document.querySelectorAll('.trans.ani-call.ani-init');

        // アニメーションを開始させるスクロール位置の閾値 (画面の高さの75%)
        const triggerPoint = window.innerHeight * 0.75;

        elementsToAnimate.forEach(element => {
            // 要素の上端が、画面の上から75%の位置より内側に入ったかどうかを判定
            if (element.getBoundingClientRect().top < triggerPoint) {
                // 'ani-init' クラスを削除してアニメーションを実行
                // このクラスが削除されると、この要素は次のスクロールイベントでは対象にならなくなる
                element.classList.remove('ani-init');
            }
        });
    });



    // ===== ハンバーガーメニュー制御 =====
    const toggleButton = document.getElementById('hamburger-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    // トグルボタンまたはモバイルメニューが存在しない場合は処理を終了
    if (!toggleButton || !mobileMenu) {
        return;
    }

    toggleButton.addEventListener('click', () => {
        // メニューパネルの表示/非表示を切り替え
        // 'translate-x-full'クラスをトグルすることで、CSSのtransformが適用/解除される
        mobileMenu.classList.toggle('opened');

        // ハンバーガーアイコンを「三」から「×」にトグルするためのクラスをボタンに追加
        toggleButton.classList.toggle('open');
    });



    // ===== PC用ドロップダウンメニュー制御 (レスポンシブ対応) =====
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const lgBreakpoint = 1200; // lgブレークポイントの値を定義

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            // lgサイズ未満の場合のみ、クリックで開閉させる
            if (window.innerWidth < lgBreakpoint) {
                e.preventDefault(); // アンカーのデフォルトのページ遷移を無効化

                const parentLi = toggle.closest('li.group');

                // 他の開いているメニューを閉じる
                document.querySelectorAll('.header-menu li.group.is-open').forEach(openLi => {
                    if (openLi !== parentLi) {
                        openLi.classList.remove('is-open');
                    }
                });

                // クリックされたメニューの開閉をトグル
                parentLi.classList.toggle('is-open');
            }
            // lgサイズ以上の場合は、通常のリンクとして機能し、CSSのhoverがメニュー開閉を担う
        });
    });

    // メニュー外をクリックしたときにメニューを閉じる (lgサイズ未満でのみ動作)
    window.addEventListener('click', (e) => {
        if (window.innerWidth < lgBreakpoint) {
            if (!e.target.closest('.header-menu li.group')) {
                document.querySelectorAll('.header-menu li.group.is-open').forEach(openLi => {
                    openLi.classList.remove('is-open');
                });
            }
        }
    });

    // ウィンドウリサイズ時に、lgサイズ以上になったらクリックで開いたメニューを閉じる
    window.addEventListener('resize', () => {
        if (window.innerWidth >= lgBreakpoint) {
            document.querySelectorAll('.header-menu li.group.is-open').forEach(openLi => {
                openLi.classList.remove('is-open');
            });
        }
    });



    // ===== ヒーローセクションのアニメーション (新しいコード) =====
    const heroSection = document.querySelector('.hero-section');

    // ページ読み込み後、すぐに（または少し遅れて）アニメーションを開始
    // setTimeoutを使うと、ブラウザが初期状態を描画する余裕が生まれます
    setTimeout(() => {
        console.log(heroSection);
        if (heroSection) {
            heroSection.classList.remove('init');
        }
    }, 100); // 100ミリ秒後 (0.1秒後) に実行



    // ===== Topicsタブ切り替え制御 (ここからが新しいコード) =====
    const topicTabs = document.querySelectorAll('.topic-tab-button');
    const topicPanels = document.querySelectorAll('.topic-tab-panel');

    topicTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;
            const targetPanel = document.getElementById(targetTab);

            // すでにアクティブなタブがクリックされた場合は何もしない
            if (!targetPanel || targetPanel.classList.contains('active')) {
                return;
            }

            // すべてのタブから 'active' クラスを削除
            topicTabs.forEach(t => t.classList.remove('active'));
            // クリックされたタブに 'active' クラスを追加
            tab.classList.add('active');

            // すべてのパネルを非表示にする
            topicPanels.forEach(panel => {
                panel.classList.remove('active');
            });

            // 対応するパネルを表示し、フェードインさせる
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
});