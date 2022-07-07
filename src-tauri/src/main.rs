#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;
use window_shadows::set_shadow;

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .setup(|app| {
            let main_window = app.get_window("main").unwrap();

            if !main_window.is_decorated().unwrap() {
                let shadow_result = set_shadow(&main_window, true);

                match shadow_result {
                    Ok(()) => (),
                    Err(error) => {
                        println!(
                            "Failed to enable shadow for window, rollback: enabling details. Error: {}",
                            error
                        );
                        main_window.set_decorations(true).expect("Failed to enable decorations.");
                    }
                }
            }

            Ok(())
        })
        .menu(if cfg!(target_os = "macos") {
            tauri::Menu::os_default(&context.package_info().name)
        } else {
            tauri::Menu::default()
        })
        .run(context)
        .expect("error while running tauri application");
}
