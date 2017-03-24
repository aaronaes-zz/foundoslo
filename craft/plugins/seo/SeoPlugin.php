<?php

namespace Craft;

/**
 * SEO for Craft CMS
 *
 * @author    Ether Creative <hello@ethercreative.co.uk>
 * @copyright Copyright (c) 2016, Ether Creative
 * @license   http://ether.mit-license.org/
 * @since     1.0
 */
class SeoPlugin extends BasePlugin {

	public static $commerceInstalled = false;

	public function getName()
	{
		return 'SEO';
	}

	public function getDescription()
	{
		return 'Search engine optimization utilities';
	}

	public function getVersion()
	{
		return '1.3.1';
	}

	public function getSchemaVersion()
	{
		return '0.0.12';
	}

	public function getDeveloper()
	{
		return 'Ether Creative';
	}

	public function getDeveloperUrl()
	{
		return 'http://ethercreative.co.uk';
	}

	public function getReleaseFeedUrl()
	{
		return 'https://raw.githubusercontent.com/ethercreative/seo/master/releases.json';
	}

	public function getSettingsUrl()
	{
		return 'seo/settings';
	}

	public function hasCpSection()
	{
		if (!craft()->isConsole()) {
			return (craft()->userSession->isAdmin() || craft()->userSession->checkPermission('accessPlugin-seo'));
	    }
		return false;
	}

	public function registerCpRoutes ()
	{
		return [
			'seo' => array('action' => 'seo/index'),
			'seo/sitemap' => array('action' => 'seo/sitemapPage'),
			'seo/redirects' => array('action' => 'seo/redirectsPage'),
			'seo/settings' => array('action' => 'seo/settings'),
		];
	}

	public function registerSiteRoutes ()
	{
		return array(
			$this->getSettings()->sitemapName . '.xml' => array('action' => 'seo/sitemap/generate')
		);
	}

	protected function defineSettings()
	{
		return array(
			// Sitemap Settings
			'sitemapName' => array(AttributeType::String, 'default' => 'sitemap'),

			// Redirect Settings
			'publicPath' => array(AttributeType::String),

			// Fieldtype Settings
			'titleSuffix' => array(AttributeType::String)
		);
	}

	public function registerUserPermissions()
	{
		return array(
			'manageSitemap' => array('label' => Craft::t('Manage Sitemap')),
			'manageRedirects' => array('label' => Craft::t('Manage Redirects')),
		);
	}

	public function init()
	{

		$commerce = craft()->db->createCommand()
			->select('id')
			->from('plugins')
			->where("class = 'Commerce'")
			->queryScalar();

		if ($commerce) {
			SeoPlugin::$commerceInstalled = true;
		}

		// TODO: On category / section update, update sitemap

		if (craft()->request->isSiteRequest() && !craft()->request->isLivePreview())
		{
			craft()->onException = function(\CExceptionEvent $event)
			{
				if(property_exists($event->exception, 'statusCode') && $event->exception->statusCode)
				{
					if ($event->exception->statusCode == 404) {
						$path = craft()->request->getPath();
						$query = craft()->request->getQueryStringWithoutPath();

						if ($query) $path .= '?' . $query;

						if ($loc = craft()->seo_redirect->findRedirectByPath($path)) {
							$event->handled = true;
							craft()->request->redirect($loc['to'], true, $loc['type']);
						}
					}
				}
			};
		}
	}

	public function prepSettings($settings)
	{
		return parent::prepSettings($settings);
	}

}