<?php
/*
Plugin Name: F13 Lightbox
Plugin URI: https://f13.dev/wordpress-plugins/wordpress-plugin-lightbox/
Description: Convert page/post content images to lightbox style links
Version: 0.0.1
Author: Jim Valentine
Author URI: https://f13.dev
Text Domain: f13-lightbox
*/

namespace F13\Lightbox;

if (!function_exists('get_plugins')) require_once(ABSPATH.'wp-admin/includes/plugin.php');
if (!defined('F13_LIGHTBOX')) define('F13_LIGHTBOX', get_plugin_data(__FILE__, false, false));
if (!defined('F13_LIGHTBOX_PATH')) define('F13_LIGHTBOX_PATH', plugin_dir_path( __FILE__ ));
if (!defined('F13_LIGHTBOX_URL')) define('F13_LIGHTBOX_URL', plugin_dir_url(__FILE__));

class Plugin
{
    public function init()
    {
        spl_autoload_register(__NAMESPACE__.'\Plugin::loader');

        add_action('wp_enqueue_scripts', array($this, 'enqueue'));

        $c = new Controllers\Control();
    }

    public static function loader($name)
    {
        $name = trim(ltrim($name, '\\'));
        if (strpos($name, __NAMESPACE__) !== 0) {
            return;
        }
        $file = str_replace(__NAMESPACE__, '', $name);
        $file = str_replace('\\', DIRECTORY_SEPARATOR, $file);
        $file = plugin_dir_path(__FILE__).strtolower($file).'.php';

        if (file_exists($file)) {
            require_once $file;
        } else {
            die('Class not found: '.$name);
        }
    }

    public function enqueue()
    {
        wp_enqueue_style('f13-lightbox', F13_LIGHTBOX_URL.'css/f13-lightbox.css', array(), F13_LIGHTBOX['Version']);
        wp_enqueue_script('f13-lightbox', F13_LIGHTBOX_URL.'js/f13-lightbox.js', array('jquery'), F13_LIGHTBOX['Version']);
    }
}

$p = new Plugin();
$p->init();