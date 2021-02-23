import React, { useState, useCallback, useMemo } from 'react';
import Tooltip from '@leafygreen-ui/tooltip';
import IconButton from '@leafygreen-ui/icon-button';
import EllipsisIcon from '@leafygreen-ui/icon/dist/Ellipsis';
import InviteUserIcon from '@leafygreen-ui/icon/dist/InviteUser';
import ActivityFeedIcon from '@leafygreen-ui/icon/dist/ActivityFeed';
import BellIcon from '@leafygreen-ui/icon/dist/Bell';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import { createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { ProjectSelect } from '../mongo-select';
import { mq, breakpoints } from '../breakpoints';
import { useViewportSize, usePoller } from '@leafygreen-ui/hooks';
import { iconLoadingStyle, textLoadingStyle, anchorOverrides } from '../styles';
import { useOnElementClick } from '../on-element-click-provider';
import {
  ProjectInterface,
  CurrentProjectInterface,
  Product,
  PlanType,
  ActiveNavElement,
  NavElement,
  Mode,
  MongoNavInterface,
  ProjectStatus,
  URLS,
  Environment,
} from '../types';
import {
  AtlasIcon,
  RealmIcon,
  ChartsIcon,
  ProjectStatusBadge,
} from '../helpers';
import { CloudManagerIcon } from '../helpers/Icons';

const {
  ProjectNavProjectDropdown,
  ProjectNavProjectSettings,
  ProjectNavProjectSupport,
  ProjectNavProjectIntegrations,
  ProjectNavCloud,
  ProjectNavRealm,
  ProjectNavCharts,
  ProjectNavInvite,
  ProjectNavActivityFeed,
  ProjectNavAlerts,
} = NavElement;

export const projectNavHeight = 45;

const productIconProp = createDataProp('charts-data-prop');

const projectNavAnchorOverrides = css`
  a:visited,
  a:active,
  a:link {
    color: ${uiColors.gray.dark2};
  }

  a:focus {
    outline: none;
  }
`;

const navContainerStyle = css`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
  height: ${projectNavHeight}px;
  box-shadow: 0 3px 7px 0 rgba(67, 117, 151, 0.08);
  box-sizing: border-box;
  background-color: white;
  position: relative;
  z-index: 0;
`;

const menuIconButtonStyle = css`
  z-index: 1;
  ${mq({
    marginRight: ['16px', '14px', '16px'],
  })}
`;

const menuIconStyle = css`
  transform: rotate(90deg);
`;

const productListStyle = css`
  display: flex;
  align-self: stretch;
  position: relative;
  padding: 0;
  margin: 0;
  list-style: none;
  margin-block-start: 0;
  margin-block-end: 0;
  flex-grow: 1;
`;

const productTabStyle = css`
  display: inline-flex;
  justify-content: center;
  position: relative;

  ${mq({
    minWidth: ['100px', '60px', '100px'],
    marginRight: ['16px', '8px', '16px'],
  })}
`;

const productStates = {
  focus: css`
    outline: none;

    &:focus {
      color: ${uiColors.blue.base};

      &:after {
        background-color: ${uiColors.blue.light1};
        opacity: 1;
        transform: scale(1);
      }

      > ${productIconProp.selector} {
        color: ${uiColors.blue.base};
      }
    }
  `,

  active: css`
    font-weight: bolder;
    color: ${uiColors.green.dark3};

    &:hover {
      color: ${uiColors.green.dark3};

      > ${productIconProp.selector} {
        color: ${uiColors.green.base};
      }
    }

    &:after {
      opacity: 1;
      transform: scale(1);
      background-color: ${uiColors.green.base}};
    }

    > ${productIconProp.selector} {
      color: ${uiColors.green.base};
    }
  `,

  loading: textLoadingStyle,

  disabled: css`
    color: ${uiColors.gray.light1};

    &:hover {
      color: ${uiColors.gray.light1};

      &:after {
        opacity: 0;
      }

      > ${productIconProp.selector} {
        color: ${uiColors.gray.light2};
      }
    }

    &:focus {
      outline: none;
    }
  `,
};

const productStyle = css`
  text-decoration: none;
  font-size: 14px;
  line-height: 16px;
  color: ${uiColors.gray.dark2};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  transition: 150ms color ease-in-out;

  &:after {
    content: '';
    height: 3px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transform: scale(0.6, 1);
    background-color: ${uiColors.gray.light2};
    transition: 150ms all ease-in-out;
    border-radius: 50px 50px 0 0;
  }

  &:hover {
    color: ${uiColors.gray.dark3};

    &:after {
      opacity: 1;
      transform: scale(1);
    }

    > ${productIconProp.selector} {
      color: ${uiColors.gray.dark2};
    }
  }
`;

const cloudManagerStyle = css`
  width: 130px;
`;

const iconButtonMargin = css`
  ${mq({
    marginRight: ['16px', '16px', '20px'],
  })}
`;

const iconButtonStyles = css`
  color: ${uiColors.green.base};
  background-color: transparent;
`;

const alertBadgeStyle = css`
  position: absolute;
  top: 3px;
  right: 4px;
  background-color: ${uiColors.red.base};
  width: 14px;
  height: 14px;
  border-radius: 200px;
  font-size: 8px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const productIconStyle = css`
  margin-right: 4px;
  color: ${uiColors.gray.base};
`;

const tooltipStyles = css`
  width: 150px;
  text-align: center;
`;

type ProjectNavProps = Pick<
  MongoNavInterface,
  | 'activeProduct'
  | 'activeNav'
  | 'onProjectChange'
  | 'admin'
  | 'mode'
  | 'environment'
  | 'alertPollingInterval'
> & {
  current?: CurrentProjectInterface;
  data?: Array<ProjectInterface>;
  onPremEnabled?: boolean;
  onPremVersion?: string;
  onPremMFA?: boolean;
  alerts?: number;
  constructProjectURL: NonNullable<MongoNavInterface['constructProjectURL']>;
  urls: URLS;
  hosts: Required<NonNullable<MongoNavInterface['hosts']>>;
};

export default function ProjectNav({
  /* eslint-disable react/prop-types */
  admin,
  current,
  data,
  constructProjectURL,
  urls,
  activeProduct,
  activeNav,
  onProjectChange,
  hosts,
  mode,
  alertPollingInterval,
  environment = Environment.Commercial,
}: /* eslint-enable react/prop-types */
ProjectNavProps) {
  const [open, setOpen] = useState(false);
  const [alerts, setAlerts] = useState(current?.alertsOpen ?? 0);

  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const onElementClick = useOnElementClick();
  const viewportSize = useViewportSize();

  function fetchAlertsCount() {
    return fetch(
      `${hosts.cloud}/user/shared/alerts/project/${currentProjectId}`,
      {
        credentials: 'include',
        mode: 'cors',
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(result => setAlerts(result.length))
      .catch(console.error);
  }

  const isCloudManager = current?.planType === PlanType.Cloud;
  const isLoading = !!current;
  const currentProjectId = current?.projectId;
  const useCNRegionsOnly =
    current?.useCNRegionsOnly === true && current?.planType === PlanType.Atlas;

  const isCNRegionsOnly = useCallback(
    (product: Product) => {
      const disabledProducts: Array<Product> = [Product.Realm, Product.Charts];
      return useCNRegionsOnly && disabledProducts.includes(product);
    },
    [useCNRegionsOnly],
  );

  usePoller(fetchAlertsCount, {
    interval: alertPollingInterval,
    enabled: mode === Mode.Production && currentProjectId != null,
  });

  const { projectNav } = urls;
  const isMobile = viewportSize
    ? viewportSize.width < breakpoints.small
    : false;

  const isGovernment = environment === Environment.Government;
  const isProjectInvite =
    activeNav === ActiveNavElement.ProjectNavInvite && isLoading;
  const isActivityFeed =
    activeNav === ActiveNavElement.ProjectNavActivityFeed && isLoading;
  const isProjectAlerts =
    activeNav === ActiveNavElement.ProjectNavAlerts && isLoading;

  const sharedTooltipProps = useMemo(() => {
    return { variant: 'dark', usePortal: false, className: tooltipStyles };
  }, []);

  const getProductClassName = useCallback(
    (product: Product) =>
      cx(anchorOverrides, projectNavAnchorOverrides, productStyle, {
        [productStates.active]: !!(activeProduct === product && current),
        [productStates.focus]: showFocus,
        [productStates.loading]: !current,
        [productStates.disabled]: isCNRegionsOnly(product),
        [cloudManagerStyle]: isCloudManager,
      }),
    [activeProduct, current, isCNRegionsOnly, isCloudManager, showFocus],
  );

  const getIconStyle = (product: Product) =>
    cx(productIconStyle, {
      [iconLoadingStyle]: !current || isCNRegionsOnly(product),
    });

  const WithTooltipIfCNRegionsOnly = useCallback(
    ({
      tooltipTestid,
      projectNavTestid,
      product,
      projectNavUrl,
      projectNavElement,
      children,
    }: {
      tooltipTestid?: string;
      projectNavTestid?: string;
      product: Product;
      projectNavUrl: string | undefined;
      projectNavElement: NavElement;
      children: React.ReactElement;
    }) => {
      return (
        <>
          {useCNRegionsOnly && (
            <Tooltip
              {...sharedTooltipProps}
              data-testid={tooltipTestid}
              tabIndex={-1}
              align="bottom"
              justify="middle"
              usePortal={false}
              darkMode={true}
              enabled={useCNRegionsOnly}
              trigger={
                <div
                  data-testid={projectNavTestid}
                  className={getProductClassName(product)}
                >
                  {children}
                </div>
              }
            >
              This product is not available for AWS China regions-only projects
            </Tooltip>
          )}
          {!useCNRegionsOnly && (
            <a
              data-testid={projectNavTestid}
              href={projectNavUrl}
              className={getProductClassName(product)}
              aria-disabled={!current}
              tabIndex={current ? 0 : -1}
              onClick={onElementClick(projectNavElement)}
            >
              {children}
            </a>
          )}
        </>
      );
    },
    [
      sharedTooltipProps,
      useCNRegionsOnly,
      current,
      getProductClassName,
      onElementClick,
    ],
  );

  return (
    <nav
      className={navContainerStyle}
      aria-label="project navigation"
      data-testid="project-nav"
    >
      <ProjectSelect
        current={current}
        data={data}
        constructProjectURL={constructProjectURL}
        hosts={hosts}
        mode={mode}
        urls={urls.mongoSelect}
        admin={admin}
        onChange={onProjectChange}
        loading={!current}
      />

      <Menu
        open={open}
        setOpen={setOpen}
        usePortal={false}
        trigger={
          <IconButton
            aria-label="More"
            className={menuIconButtonStyle}
            active={open}
            disabled={!current}
            data-testid="project-nav-project-menu"
            onClick={onElementClick(ProjectNavProjectDropdown)}
            aria-expanded={open}
          >
            <EllipsisIcon className={menuIconStyle} />
          </IconButton>
        }
      >
        <MenuItem
          href={projectNav.settings!}
          data-testid="project-nav-settings"
          active={activeNav === ActiveNavElement.ProjectNavProjectSettings}
          onClick={onElementClick(ProjectNavProjectSettings, () =>
            setOpen(false),
          )}
        >
          Project Settings
        </MenuItem>

        <MenuItem
          href={projectNav.support!}
          data-testid="project-nav-support"
          active={activeNav === ActiveNavElement.ProjectNavProjectSupport}
          onClick={onElementClick(ProjectNavProjectSupport, () =>
            setOpen(false),
          )}
        >
          Project Support
        </MenuItem>
        <MenuItem
          href={projectNav.integrations!}
          data-testid="project-nav-integrations"
          active={activeNav === ActiveNavElement.ProjectNavProjectIntegrations}
          onClick={onElementClick(ProjectNavProjectIntegrations, () =>
            setOpen(false),
          )}
        >
          Integrations
        </MenuItem>
      </Menu>

      {!isMobile &&
        admin &&
        current?.status &&
        Object.values(ProjectStatus).includes(current?.status) && (
          <ProjectStatusBadge currentStatus={current.status} />
        )}

      <ul className={productListStyle}>
        <li className={productTabStyle}>
          <a
            href={
              current ? `${hosts.cloud}/v2/${current.projectId}#` : hosts.cloud
            }
            className={getProductClassName('cloud')}
            aria-disabled={!current}
            tabIndex={current ? 0 : -1}
            onClick={onElementClick(ProjectNavCloud)}
            data-testid={`project-nav-${
              isCloudManager ? 'cloud-manager' : 'atlas'
            }`}
          >
            {!isMobile && isCloudManager ? (
              <CloudManagerIcon
                {...productIconProp.prop}
                active={activeProduct === Product.Cloud && isLoading}
                className={getIconStyle(Product.Cloud)}
              />
            ) : (
              <AtlasIcon
                {...productIconProp.prop}
                active={activeProduct === Product.Cloud && isLoading}
                className={getIconStyle(Product.Cloud)}
              />
            )}
            {isCloudManager ? 'Cloud Manager' : 'Atlas'}
          </a>
        </li>

        {!isGovernment && !isCloudManager && (
          <>
            <li className={productTabStyle}>
              <WithTooltipIfCNRegionsOnly
                tooltipTestid="project-nav-tooltip-realm"
                projectNavTestid="project-nav-realm"
                product={Product.Realm}
                projectNavUrl={projectNav.realm}
                projectNavElement={ProjectNavRealm}
              >
                <>
                  {!isMobile && (
                    <RealmIcon
                      {...productIconProp.prop}
                      active={activeProduct === Product.Realm && isLoading}
                      className={getIconStyle(Product.Realm)}
                    />
                  )}
                  Realm
                </>
              </WithTooltipIfCNRegionsOnly>
            </li>

            <li className={productTabStyle}>
              <WithTooltipIfCNRegionsOnly
                tooltipTestid="project-nav-tooltip-charts"
                projectNavTestid="project-nav-charts"
                product={Product.Charts}
                projectNavUrl={projectNav.charts}
                projectNavElement={ProjectNavCharts}
              >
                <>
                  {!isMobile && (
                    <ChartsIcon
                      {...productIconProp.prop}
                      className={getIconStyle(Product.Charts)}
                      active={activeProduct === Product.Charts && isLoading}
                    />
                  )}
                  Charts
                </>
              </WithTooltipIfCNRegionsOnly>
            </li>
          </>
        )}
      </ul>

      {!isMobile && (
        <>
          <Tooltip
            {...sharedTooltipProps}
            tabIndex={-1}
            align="bottom"
            justify="middle"
            usePortal={false}
            darkMode={true}
            trigger={
              <IconButton
                aria-label="Invite"
                href={projectNav.invite as string}
                className={cx(iconButtonMargin, {
                  [iconButtonStyles]: isProjectInvite,
                })}
                size="large"
                disabled={!current}
                active={isProjectInvite}
                data-testid="project-nav-invite"
                onClick={onElementClick(ProjectNavInvite)}
              >
                <InviteUserIcon size="large" />
              </IconButton>
            }
          >
            Invite To Project
          </Tooltip>

          <Tooltip
            {...sharedTooltipProps}
            align="bottom"
            justify="middle"
            usePortal={false}
            darkMode={true}
            trigger={
              <IconButton
                aria-label="Project Activity Feed"
                href={projectNav.activityFeed as string}
                size="large"
                className={cx(iconButtonMargin, {
                  [iconButtonStyles]: isActivityFeed,
                })}
                disabled={!current}
                active={isActivityFeed}
                data-testid="project-nav-activity-feed"
                onClick={onElementClick(ProjectNavActivityFeed)}
              >
                <ActivityFeedIcon size="large" />
              </IconButton>
            }
          >
            View the Project Activity Feed
          </Tooltip>

          <Tooltip
            {...sharedTooltipProps}
            align="bottom"
            justify="end"
            usePortal={false}
            darkMode={true}
            trigger={
              <IconButton
                aria-label="Alerts"
                href={projectNav.alerts as string}
                size="large"
                disabled={!current}
                active={isProjectAlerts}
                data-testid="project-nav-alerts"
                onClick={onElementClick(ProjectNavAlerts)}
                className={cx({ [iconButtonStyles]: isProjectAlerts })}
              >
                {alerts > 0 && (
                  <div
                    className={alertBadgeStyle}
                    data-testid="project-nav-alerts-badge"
                  >
                    {alerts}
                  </div>
                )}

                <BellIcon size="large" />
              </IconButton>
            }
          >
            View the Project Alerts
          </Tooltip>
        </>
      )}
    </nav>
  );
}
