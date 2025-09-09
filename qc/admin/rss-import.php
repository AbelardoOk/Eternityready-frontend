<?php

set_time_limit(0);
$load_scrolltofixed = 1;
$load_chzn_drop = 1;
$_page_title = 'Manage RSS Feeds';
$showm = 'mod_rss_import';
$tab_cron = 1;
include('header.php');

$info_msg = '';

try {
    rfi_check_installation();
    $loadingRSS = false;

    if ($_POST['submit'] && ! csrfguard_check_referer('_admin_rss_feed_import'))
    {
        $info_msg = pm_alert_error('Invalid token or session expired. Please revisit this page and try again.');
    } else if ($_POST['submit'] === 'add-rss-feed') {
        $result = rfi_add_rss($_POST['rss_feed_url']);

        $info_msg = pm_alert_success('<strong>'. $result['msg'] .'</strong> <a href="'. _URL .'/admin/edit-series.php?do=edit&series_id='. $result['series_id'] .'" target="_blank">Continiue editing the series here</a>.');
    }

    if ($_GET['action'] === 'run') {
        $loadingRSS = true;
        rfi_load_episodes((int) $_GET['id']);
    }

    if ($_GET['action'] === 'delete') {
        rfi_delete_feed((int) $_GET['id']);
    }
} catch (Exception $e) {
    if ($loadingRSS) {
        rfi_delete_feed((int) $_GET['id']);
        pm_alert_error('Podcast was removed due to problem with loading feed: ' . $e->getMessage());
    } else {
        $info_msg = pm_alert_error($e->getMessage());
    }
}

$feeds = rfi_get_rss_feeds();

$csrf_nonce = csrfguard_raw('_admin_rss_feed_import');

?>

<!-- Main content -->
<div class="content-wrapper">
    <div class="page-header-wrapper">
        <div class="page-header page-header-light">
            <div class="page-header-content header-elements-md-inline">
                <div class="d-flex justify-content-between w-100">
                    <div class="page-title d-flex">
                        <h4><span class="font-weight-semibold">RSS Feeds</span></h4>
                    </div>
                    <a href="#" class="header-elements-toggle text-default d-md-none"><i class="mi-search"></i></a>
                    <div class="header-elements with-search d-none">
                        <div class="d-flex-inline align-self-center ml-auto">

                        </div>
                    </div>
                </div>
            </div>

            <div class="breadcrumb-line breadcrumb-line-light header-elements-md-inline">
                <div class="d-flex">
                    <div class="breadcrumb">
                        <a href="index.php" class="breadcrumb-item"><i class="icon-home2 mr-2"></i> Home</a>
                        <a href="automated-jobs.php" class="breadcrumb-item"><span class="breadcrumb-item active"><?php echo $_page_title; ?></span></a>
                    </div>
                </div>
                <div class="header-elements d-none d-md-block"><!--d-none-->
                    <div class="breadcrumb justify-content-center">
                        <a href="#" id="show-help-assist" class="breadcrumb-elements-item"><i class="mi-help-outline text-muted"></i></a>
                    </div>
                </div>
            </div>
        </div><!--.page-header -->
    </div><!--.page-header-wrapper-->
    <div class="page-help-panel" id="help-assist">
        <div class="row">
            <div class="col-2 help-panel-nav">
                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a class="nav-link active" id="v-pills-tab-help-one" data-toggle="pill" href="#v-pills-one" role="tab" aria-controls="v-pills-one" aria-selected="true" data-toggle="tab">Overview</a>
                </div>
            </div>
            <div class="col-10 help-panel-content">
                <div class="tab-content" id="v-pills-tabContent">
                    <div class="tab-pane show active" id="v-pills-one" role="tabpanel" aria-labelledby="v-pills-tab-help-one">
                        <h5>Overview</h5>
                        <p>lorem help ipsum</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- /page header -->
    <!-- Content area -->
    <div class="content content-full-width">
        <div id="display_result" style="display:none;"></div>

        <form name="add_rss_feed" id="add_rss_feed" method="post" action="rss-import.php?do=add_url" onsubmit="return validateFormOnSubmit(this, 'Please fill in the required fields (highlighted).')">
            <div class="row">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-header bg-white header-elements-inline">
                            <h6 class="card-title font-weight-semibold">Add RSS Feed</h6>
                            <div class="header-elements">
                                <div class="list-icons">
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <input name="rss_feed_url" type="text" class="form-control form-required permalink-make font-weight-semibold font-size-lg" placeholder="RSS Feed URL" value="" />
                        </div>
                        <div class="card-footer">
                            <button type="submit" name="submit" value="add-rss-feed" class="btn btn-sm btn-outline alpha-success text-success-400 border-success-400 border-2"><i class="mi-check"></i> Add</button>
                        </div>
                    </div><!--.card-->
                </div><!-- col-md-5 -->
            </div>
            <?php echo rfi_csrfguard_form_with_nonce($csrf_nonce) ?>
        </form>
        <?php echo $info_msg; ?>
        <div class="card card-blanche">
            <div class="card-body">
                <div class="row">
                    <div class="col-5">
                        <?php if ( ! empty($_POST['keywords'])) : ?>
                            <h5 class="font-weight-semibold mt-2">SEARCH RESULTS FOR <mark><?php echo $_POST['keywords']; ?></mark> <a href="#" onClick="parent.location='automated-jobs.php'" class="text-muted opacity-50" data-popup="tooltip" data-original-title="Clear search results"><i class="icon-cancel-circle2"></i></a></h5>
                        <?php endif; ?>
                    </div>
                    <div class="col-7">
                        <div class="float-right">

                        </div>
                    </div>
                </div> <!--.row with filters -->
            </div><!--.card-body-->

            <form name="rss_import_form" id="rss_import_form" action="rss-import.php?page=<?php echo $page;?>" method="post">
                <div class="datatable-scroll">
                    <table class="table table-md table-striped table-columned pm-tables tablesorter">
                        <thead>
                        <tr>
                            <th align="center" class="text-center" width="3%"><input type="checkbox" name="checkall" id="selectall" onclick="checkUncheckAll(this);"/></th>
                            <th width="30"></th>
                            <th>Podcast</th>
                            <th>RSS URL</th>
                            <th width="" class="text-center">Frequency</th>
                            <th width="" class="text-center">Last Checked</th>
                            <th style="width: 220px;" class="text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>

                        <?php if (count($feeds) > 0): $alt = 1; ?>
                        <?php foreach($feeds as $id => $feed): ?>
                        <?php $col = ($alt % 2) ? 'table_row1' : 'table_row2'; $alt++; ?>
                            <tr class="<?php echo $col; ?>">
                                <td></td>
                                <td><?php echo $id ?></td>
                                <td><?php echo $feed['podcast_name'] ?></td>
                                <td><?php echo $feed['url'] ?></td>
                                <td>once per day</td>
                                <td><?php echo $feed['last_check'] ?></td>
                                <td class="text-center table-col-action">
                                    <a href="<?php echo rfi_csrfguard_url_with_nonce('?action=run&id=' . $id, $csrf_nonce); ?>" class="list-icons-item mr-1 cron-start-stop-btn text-success" id="rss-start-btn-<?php echo $id; ?>" rel="tooltip" title="Sync RSS Feed"><i class="icon-play4"></i></a>
                                    <a href="<?php echo rfi_csrfguard_url_with_nonce('?action=delete&id=' . $id, $csrf_nonce); ?>" class="list-icons-item text-danger cron-delete-btn" rel="tooltip" title="Delete" data-feed-id="<?php echo $id; ?>"><i class="icon-bin"></i></a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                        <?php else: ?>
                            <tr>
                                <td colspan="7" align="center" class="text-center">
                                    No RSS Feed added
                                </td>
                            </tr>
                        <?php endif; ?>
                        <?php if ($pagination != '') : ?>
                            <tr class="tablePagination">
                                <td colspan="6" class="tableFooter">
                                    <div class="pagination float-right"><?php echo $pagination; ?></div>
                                </td>
                            </tr>
                        <?php endif; ?>
                        </tbody>
                    </table>
                </div>

                <?php echo rfi_csrfguard_form_with_nonce($csrf_nonce) ?>
            </form>

        </div><!--.card-->
    </div><!-- /content area -->
</div><!-- /content wrapper -->
<?php
include('footer.php');
